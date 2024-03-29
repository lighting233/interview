//this.setState
Component.prototype.setState = function (partialState, callback) {
  if (
    !(
      typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState == null
    )
  ) {
    {
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
      );
    }
  }
  //1.enqueueSetState
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

function enqueueSetState(inst, payload, callback) {
    // 通过组件实例获取对应fiber
    const fiber = getInstance(inst);
  
    const eventTime = requestEventTime();
    const suspenseConfig = requestCurrentSuspenseConfig();
  
    // 2. //获取优先级
    const lane = requestUpdateLane(fiber, suspenseConfig);
  
    // 2.createUpdate 创建update
    const update = createUpdate(eventTime, lane, suspenseConfig);
  
    //3.
    update.payload = payload;
  
    // 赋值回调函数
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }
  
    // 4.将update插入updateQueue
    enqueueUpdate(fiber, update);
    // 5.调度update
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }

//6.markUpdateLaneFromFiberToRoot -> ensureRootIsScheduled
//ensureRootIsScheduled 有两个作用：
//1、前半部分: 判断是否需要注册新的任务（如果无需新的调度, 会退出函数）
//2、后半部分: 注册调度任务，performSyncWorkOnRoot 或 performConcurrentWorkOnRoot被封装到了任务回调(scheduleCallback)中，等待调度中心执行任务
//不光是每次更新会作为入口，每次 commit 结束还会再调一次确保所有的更新处理完成。
  function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
    const existingCallbackNode = root.callbackNode;
  
    // 标记长时间未执行的任务，避免饥饿
    markStarvedLanesAsExpired(root, currentTime);
  
    // 获取本次渲染的优先级，下面展开看
    const nextLanes = getNextLanes(
      root,
      root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes,
    );
  
    // 没有更新要处理，commit 完成 check 大部分会进到这里
    if (nextLanes === NoLanes) {
      if (existingCallbackNode !== null) {
        cancelCallback(existingCallbackNode);
      }
      root.callbackNode = null;
      root.callbackPriority = NoLane;
      return;
    }
  
    // We use the highest priority lane to represent the priority of the callback.
    const newCallbackPriority = getHighestPriorityLane(nextLanes);
  
    // 是否已经有同样优先级的任务，比如多次执行 setState.
    const existingCallbackPriority = root.callbackPriority;
    if (existingCallbackPriority === newCallbackPriority) {
      return;
    }
    
    if (existingCallbackNode != null) {
      // Cancel the existing callback. We'll schedule a new one below.
      cancelCallback(existingCallbackNode);
    }
  
    // Schedule a new callback.
    let newCallbackNode;
    if (newCallbackPriority === SyncLane) {
      // 略，同步更新，不通过 scheduler，直接调用 performSyncWorkOnRoot 执行同步的 render 了
      // 任务已经过期，需要同步执行render阶段
      newCallbackNode = scheduleSyncCallback(
      performSyncWorkOnRoot.bind(null, root)
    );
    } else {
      let schedulerPriorityLevel;
      // Lanes 模型到 Scheduler 优先级的映射，展开看下
      switch (lanesToEventPriority(nextLanes)) {
        case DiscreteEventPriority:
          schedulerPriorityLevel = ImmediateSchedulerPriority;
          break;
        case ContinuousEventPriority:
          schedulerPriorityLevel = UserBlockingSchedulerPriority;
          break;
        case DefaultEventPriority:
          schedulerPriorityLevel = NormalSchedulerPriority;
          break;
        case IdleEventPriority:
          schedulerPriorityLevel = IdleSchedulerPriority;
          break;
        default:
          schedulerPriorityLevel = NormalSchedulerPriority;
          break;
      }
      // 调度任务
      newCallbackNode = scheduleCallback(
        schedulerPriorityLevel,
        performConcurrentWorkOnRoot.bind(null, root),
      );
    }
  
    root.callbackPriority = newCallbackPriority;
    root.callbackNode = newCallbackNode;
  }

  function dispatchAction(queue, action) {
    // 创建update
    const update = {
      action,
      next: null,
    };
  
    // 环状单向链表操作
    if (queue.pending === null) {
      update.next = update;
    } else {
        //新的指向头
      update.next = queue.pending.next;
      //尾指向新的update
      queue.pending.next = update;
    }
    queue.pending = update;
  
    // 模拟React开始调度更新
    schedule();
  }

function useState(initialState) {
    let hook;
    if(isMount) {
        hook = {
            memoizeState: initialState,
            queue: {
                pending: null
            },
            next: null;
        }
        if(!fiber.memoizeState) {
            fiber.memoizeState = hook;
        }else {
            workInProgressHook.next = hook;
        }
        workInProgressHook = hook;
    }else {
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }

    let baseState = hook.memoizeState;
    if(hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;

        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending.next)
        hook.queue.pending = null;
    }
    hook.memoizeState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)]
}

