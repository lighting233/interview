## 并发更新

### 并发模式和截流防抖的区别
- 防抖只是没有执行 task，一直积攒，然后一次执行一个特别长的 task，类似于批处理  

### 打断while的三种情况
1. 高优先级
2. 饥饿问题
3. 时间切片

### 调度需要考虑的情况
1. 工作过程仅有一个work
    如果仅有一个work,Scheduler有个忧化路径：如果调度的固调函数的返回值是函数，则直接接调度返回的函数。
2. 工作过程中产生相同优先级的work
    有过优先级相同，則不需要开启新的调度。
3. 工作过程中产生更高/低优先级的work
    把握一个原则：我们每次选出的参是优先级最高的work。

### 工作流程
1. `schedule`阶段
   1. 获取当前最高优先级和上一次更新被中断的回调（performConcurrentWorkOnRoot）
   2. 如果更新优先级为NoLane，表示已经没有更新了，重置状态，取消回调
   3. 如果本次更新的优先级和上一次调度的优先级相同，则不需要开启新的调度了
   4. 至此低优先级的不会打断高优先级的进入这次调度，同等优先级的被返回没有再开启调度，剩下就是开始新的高优先级的调度了
   5. 首先取消低优先级的回调
   6. 如果是同步优先级的开启同步微任务调度
   7. 如果不是同步把当前优先级转化为`scheduleCallback`的优先级开始调度`performConcurrentWorkOnRoot`;
   8. 函数执行完返回一个新的`performConcurrentWorkOnRoot`,root 上记录这个`callback`和当前优先级
```ts{.line-numbers}
export function ensureRootIsScheduled(root: FiberRootNode) {
	const updateLane = getNextLane(root);
	const existingCallback = root.callbackNode;

	if (updateLane === NoLane) {
		if (existingCallback !== null) {
			unstable_cancelCallback(existingCallback);
		}
		root.callbackNode = null;
		root.callbackPriority = NoLane;
		return;
	}

	const curPriority = updateLane;
	const prevPriority = root.callbackPriority;

	if (curPriority === prevPriority) {
		return;
	}

	if (existingCallback !== null) {
		unstable_cancelCallback(existingCallback);
	}
	let newCallbackNode = null;

	if (updateLane === SyncLane) {
		// 同步优先级 用微任务调度
		// [performSyncWorkOnRoot, performSyncWorkOnRoot, performSyncWorkOnRoot]
		scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLane));
		scheduleMicroTask(flushSyncCallbacks);
	} else {
		// 其他优先级 用宏任务调度
		const schedulerPriority = lanesToSchedulerPriority(updateLane);

		newCallbackNode = scheduleCallback(
			schedulerPriority,
			performConcurrentWorkOnRoot.bind(null, root)
		);
	}
    //callbackNode是scheduleCallback生成的一个 task
	root.callbackNode = newCallbackNode;
	root.callbackPriority = curPriority;
}
```

1. 执行`performConcurrentWorkOnRoot`并发更新的开始,这个函数中执行 `renderRoot`,`renderRoot`render 阶段返回是否完成render的状态，根据状态决定是否执行 `commitRoot`,还是返回`performConcurrentWorkOnRoot`
   1. 这个函数在`scheduleCallback`中被调度，会被注入`didTimeout`
   2. 并发更新开始前，我们要保证 `useEffect` 的回调都执行完了，因为`useEffect`的执行可能会触发更新，更新的优先级可能更高，从而打断这次更新。在 `commit` 中的`beforeMutation`前还是调度 `effect` 任务的注册
      - 例如第一轮是一个同步更新，并在更新中注册了一个高优先级的更新，commit 阶段注册并收集了 effect，但是优先级没有之前这个优先级高，调度这个更新时也要先检查 effect 是否会注册更高优先级的更新。
   3. 执行 `renderRoot` 并根据是否到期和同步任务注入参数，`renderRoot` 决定是开启同步更新还是并发更新
   4. 根据`renderRoot`返回的状态决定
      1. 如果任务未完成，当前的回调不等于 root 上挂载的回调，说明有了更高优先级的任务，直接返回即可，当前等级的更新不再执行；如果之前和现在的 callback 相同，说明任务只是被中断了，优先级相同，返回这个`performConcurrentWorkOnRoot`记录到 `root.callbackNode`上。==schduler包的workLoop方法会执行scheduleCallback生成的 task 上的 callback 即performConcurrentWorkOnRoot，如果返回的是一个函数，则currentTask.callback等于返回的这个函数，当前 task 不会被 pop 掉，而是重新执行这个任务==
      2. 如果render任务完成了，则开启 commit 阶段。
```ts {.line-numbers}
function performConcurrentWorkOnRoot(
	root: FiberRootNode,
	didTimeout: boolean
){
	// 保证useEffect回调执行
	const curCallback = root.callbackNode;
	const didFlushPassiveEffect = flushPassiveEffects(root.pendingPassiveEffects);
	if (didFlushPassiveEffect) {
		if (root.callbackNode !== curCallback) {
			return null;
		}
	}

	const lane = getNextLane(root);
	const curCallbackNode = root.callbackNode;
	if (lane === NoLane) {
		return null;
	}
	const needSync = lane === SyncLane || didTimeout;
	// render阶段
	const exitStatus = renderRoot(root, lane, !needSync);

	switch (exitStatus) {
		// 中断
		case RootInComplete:
			if (root.callbackNode !== curCallbackNode) {
				return null;
			}
			return performConcurrentWorkOnRoot.bind(null, root);
		case RootCompleted:
			const finishedWork = root.current.alternate;
			root.finishedWork = finishedWork;
			root.finishedLane = lane;
			wipRootRenderLane = NoLane;
			commitRoot(root);
			break;
		case RootDidNotComplete:
			markRootSuspended(root, lane);
			wipRootRenderLane = NoLane;
			ensureRootIsScheduled(root);
			break;
		default:
			
	}
}
```

```ts {.line-numbers}
function workLoopSync() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
function workLoopConcurrent() {
	while (workInProgress !== null && !unstable_shouldYield()) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber, wipRootRenderLane);
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}
```

### 实现并发更新的状态计算
1. 状态计算是在`updateState`中的`processUpdateQueue`中消费的
2. 获取本次更新优先级的 `update` 是在`isSubsetOfLanes`中获取，即当前更新的全局优先级为`renderLanes`，和`update.lanes` 取交集，在`renderLanes`范围中的是本次需要更新的，其余是跳过的，哪怕优先级更高

### 如何兼顾 update 的连续性和 update 的优先级？
- baseState是本次更新参与计算的初始state，memoizedState是上次更新计算的最终state
- 如果本次更新没有update被跳过，則下次更新开始时baseState === memoizedState
- 如果本次更新有update被跳过，则本次更新计算出的memoizedState为「考虑优先级」情况下计算的结果，baseState为「最后一个没被跳过的update 计算后的结果」（即第一个跳过的 update 的前一个 update），下次更新开始baseState  ！== memoizedState
- 本次更新「被跳过的update及其后面的所有update」都会被保存在baseQueue中参与下次statei算
- 本次更新「参与计算但保存在baseQueue中的update」，优先级会降低到NoLane， 因为NoLane和renderLanes取交集永远都在交集中