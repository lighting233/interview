
## 批处理默认情况下在微任务中处理，开启并发更新批处理在宏任务中执行
1. 需要实现一套优先级机制，每个更新都拥有优先级
2. 需要能够合并一个宏任务/微任务中能发的所有更新
3. 需要一套算法，用于决定哪个优先级优先进入render阶段
   
## lane模型
- lane（二进制位，代表优先级）
- lanes（二进制位，代表lane的集合）
其中：
- lane作为update的优先级
- lanes作为lane的集合

消费：
- 本次更新 lane
- lanes 集合，用来记录要消费的 lane，在 schdule 中选出 lane


## schedule调度阶段
- 在`dispatch` 中`const update = createUpdate(action,lane);enqueueUpdate(updateQueue, update);`并调度 `scheduleUpdateOnFiber(fiber, lane);`
- 每次在`ensureRootIsScheduled`中选出优先级最高的 lane`const curPriority = getHighestPriorityLane(updateLanes);`
### 同步调度
- `curPriority === SyncLane`时在微任务调度同步任务
```ts
scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLanes));
scheduleMicrotask(flushSyncCallbacks);
```
- 本次setState执行结束
- 再次执行setState，最终会在`syncQueue`加入多个任务，生成多个`queueMicrotask`
### `syncQueue=[performSyncWorkOnRoot,performSyncWorkOnRoot,performSyncWorkOnRoot]`只执行第一个，后边的执行后都会返回
- 主代码执行完后，会进入微任务阶段，执行`performSyncWorkOnRoot`，在代码开始判断
```ts
    if (nextLane !== SyncLane) {
		ensureRootIsScheduled(root);
		return;
	}
```
- 在 `renderRoot` 中 `workInProgressRootRenderLane = NoLane;`，所以下一轮`performSyncWorkOnRoot`直接 `return` 掉
- `functionComponent`执行中`updateState`中执行`processUpdateQueue`消费 `updatequeue`

### 多个微任务执行问题
- 第一组微任务执行完`syncQueue`已经清空了
```ts
export function flushSyncCallbacks() {
	if (!isFlushingSyncQueue && syncQueue) {
		isFlushingSyncQueue = true;
		try {
			syncQueue.forEach((callback) => callback());
			syncQueue = null;
		} catch (e) {
			console.error('TODO flushSyncCallbacks报错', e);
		} finally {
			isFlushingSyncQueue = false;
		}
	}
}
```
## commit阶段移除消费的lane

## 优先级从何而来？
- 不同交互产生不同优先级
```ts
const eventTypeToEventPriority = (eventType: string) => {
	switch (eventType) {
		case 'click':
		case 'keydown':
		case 'keyup':
			return SyncLane;
		case 'scroll':
			return InputContinuousLane;
		// TODO 更多事件类型
		default:
			return DefaultLane;
	}
};
```
- `runWithPriority`接收`eventTypeToEventPriority`返回的 lane 和一个回调函数，复制给全局变量`currentPriorityLevel`，使用`unstable_getCurrentPriorityLevel`可以拿到
- 进一步还能推广到任何可以触发更新的上下文环境，比如 useEffect 回调中触发更新的优先级，首屏渲染优先级等。

### 如何把 lanes 的优先级转化为 schduler 的五种优先级
获取当前最高优先级，这个优先级和几个特定值比较大小，返回四种优先级，再和四种优先级匹配，默认的 default 是 normal 级别
  1. ImmediatePriority,
  2. UserBlockingPriority,
  3. NormalPriority,
  4. LowPriority,
  5. IdlePriority,空闲优先级

```ts
// 将lane优先级 转化为 Schedule 优先级
    let schedulerPriorityLevel;
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
    // 调度performConcurrentWorkOnRoot
    // 将返回的taskNode，保存
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root),
    );

export function lanesToEventPriority(lanes: Lanes): EventPriority {
  const lane = getHighestPriorityLane(lanes);
  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }
  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }
  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }
  return IdleEventPriority;
}

function getHighestPriorityLanes(lanes: Lanes | Lane): Lanes {
  switch (getHighestPriorityLane(lanes)) {
    case SyncLane:
      return SyncLane;
    case InputContinuousHydrationLane:
      return InputContinuousHydrationLane;
    case InputContinuousLane:
      return InputContinuousLane;
    case DefaultHydrationLane:
      return DefaultHydrationLane;
    case DefaultLane:
      return DefaultLane;
    case TransitionHydrationLane:
      return TransitionHydrationLane;
    case TransitionLane1:
    case TransitionLane2:
    case TransitionLane3:
    case TransitionLane4:
    case TransitionLane5:
    case TransitionLane6:
    case TransitionLane7:
    case TransitionLane8:
    case TransitionLane9:
    case TransitionLane10:
    case TransitionLane11:
    case TransitionLane12:
    case TransitionLane13:
    case TransitionLane14:
    case TransitionLane15:
    case TransitionLane16:
      return lanes & TransitionLanes;
    case RetryLane1:
    case RetryLane2:
    case RetryLane3:
    case RetryLane4:
    case RetryLane5:
      return lanes & RetryLanes;
    case SelectiveHydrationLane:
      return SelectiveHydrationLane;
    case IdleHydrationLane:
      return IdleHydrationLane;
    case IdleLane:
      return IdleLane;
    case OffscreenLane:
      return OffscreenLane;
    default:
      if (__DEV__) {
        console.error(
          'Should have found matching lanes. This is a bug in React.',
        );
      }
      // This shouldn't be reachable, but as a fallback, return the entire bitmask.
      return lanes;
  }
}
```

