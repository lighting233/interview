// @ts-nocheck

//todo 一、ReactDOM.createRoot().render的流程
//todo createRoot -> createContainer-> hostRootFiber-> root -> render -> updateContainer -> scheduleUpdateOnFiber
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue<ReactElement>();
	return root;
}

export function updateContainer(
	element: ReactElement | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const rootRenderPriority = SyncLane;
	const update = createUpdate<ReactElement | null>(element, rootRenderPriority);
    //todo 创建了UpdateQueue，所以和scheduleUpdateOnFiber建立了联系
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>,
		update
	);
    //todo
	scheduleUpdateOnFiber(hostRootFiber, rootRenderPriority);
	return element;
}

export function createRoot(container: Container) {
	let root = containerToRoot.get(container);
	if (!root) {
		root = createContainer(container);
		containerToRoot.set(container, root);
	} 
	return {
		render(element: ReactElement) {
			return updateContainer(element, root);
		},
		unmount() {
			containerToRoot.delete(container);
			return updateContainer(null, root);
		}
	};
}

export function createRoot(container: Container) {
	let root = containerToRoot.get(container);
	if (!root) {
		root = createContainer(container);
		containerToRoot.set(container, root);
	} else {
		throw '你在之前已经传递给createRoot()的container上调用了ReactDOM.createRoot()';
	}
	return {
		render(element: ReactElement) {
			if (containerToRoot.get(container) !== root) {
				throw '不能更新一个卸载的root.';
			}
			clearContainerDOM(container);
			initEvent(container, 'click');
			return updateContainer(element, root);
		},
		unmount() {
			containerToRoot.delete(container);
			return updateContainer(null, root);
		}
	};
}

function markUpdateLaneFromFiberToRoot(fiber: FiberNode, lane: Lane) {
	let node = fiber;
	let parent = node.return;

	node.lanes = mergeLanes(node.lanes, lane);
	const alternate = node.alternate;
	if (alternate) {
		alternate.lanes = mergeLanes(alternate.lanes, lane);
	}

	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

export function scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) {
	if (__LOG__) {
		console.log('开始schedule阶段', fiber, lane);
	}
	const root = markUpdateLaneFromFiberToRoot(fiber, lane);
	// TODO 饥饿问题
	markRootUpdated(root, lane);
	console.log('root', root);
	if (root === null) {
		return;
	}
	ensureRootIsScheduled(root);
}

function ensureRootIsScheduled(root: FiberRootNode) {
	const updateLanes = getNextLanes(root);
	const existingCallback = root.callbackNode;

	if (updateLanes === NoLanes) {
		if (existingCallback !== null) {
			cancelSchedulerCallback(existingCallback);
		}
		root.callbackNode = null;
		root.callbackPriority = NoLane;
		return;
	}
	const curPriority = getHighestPriorityLane(updateLanes);
	const prevPriority = root.callbackPriority;

	if (curPriority === prevPriority) {
		// 有更新在进行，比较该更新与正在进行的更新的优先级
		// 如果优先级相同，则不需要调度新的，退出调度
		return;
	}
	if (existingCallback !== null) {
		cancelSchedulerCallback(existingCallback);
	}
	// 如果使用Scheduler调度，则会存在新的callbackNode，用React微任务调度不会存在
	let newCallbackNode = null;
	if (curPriority === SyncLane) {
		// React调度
		if (__LOG__) {
			console.log('在微任务中调度执行，优先级：', updateLanes);
		}
		// 微任务中调度执行
		scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLanes));
		scheduleMicrotask(flushSyncCallbacks);
	} else {
		// Scheduler调度
		const schedulerPriority = lanesToSchedulerPriority(curPriority);
		newCallbackNode = scheduleCallback(
			schedulerPriority,
			performConcurrentWorkOnRoot.bind(null, root)
		);
	}
	root.callbackNode = newCallbackNode;
	root.callbackPriority = curPriority;
}



export const beginWork = (workInProgress: FiberNode, renderLane: Lane) => {
	if (__LOG__) {
		console.log('beginWork流程', workInProgress.type);
	}
	// 接下来processUpdate会消耗lanes
	workInProgress.lanes = NoLane;

	switch (workInProgress.tag) {
		case HostRoot:
			return updateHostRoot(workInProgress, renderLane);
		case HostComponent:
			return updateHostComponent(workInProgress);
		case HostText:
			return null;
		case FunctionComponent:
			return updateFunctionComponent(workInProgress, renderLane);
		default:
			console.error('beginWork未处理的情况');
			return null;
	}
};

function updateFunctionComponent(workInProgress: FiberNode, renderLane: Lane) {
	const nextChildren = renderWithHooks(workInProgress, renderLane);
	reconcileChildren(workInProgress, nextChildren);
	return workInProgress.child;
}

function updateHostComponent(workInProgress: FiberNode) {
	// 根据element创建fiberNode
	const nextProps = workInProgress.pendingProps;
	const nextChildren = nextProps.children;
	reconcileChildren(workInProgress, nextChildren);
	return workInProgress.child;
}

function updateHostRoot(workInProgress: FiberNode, renderLanes: Lanes) {
	const baseState = workInProgress.memoizedState;
	const updateQueue = workInProgress.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memoizedState } = processUpdateQueue(baseState, pending, renderLanes);
	workInProgress.memoizedState = memoizedState;

	const nextChildren = workInProgress.memoizedState;
	reconcileChildren(workInProgress, nextChildren);
	return workInProgress.child;
}

function reconcileChildren(workInProgress: FiberNode, children?: ReactElement) {
	const current = workInProgress.alternate;

	if (current !== null) {
		// update
		workInProgress.child = reconcileChildFibers(
			workInProgress,
			current.child,
			children
		);
	} else {
		// mount
		workInProgress.child = mountChildFibers(workInProgress, null, children);
	}
}