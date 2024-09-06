## bailout

### 策略
- 当`useState`更新的`state`与当前`state`一样时（使用`Object.is`比较），React不会`render`该组件的「子孙组件」。
- **注意**：当命中bailout后，当前组件可能还是会render，只是他的「子孙组件」不会render。
- 这是因为，大部分情况下，只有当前组件render，useState才会执行，才能计算出state，进而与当前state比较。

### 实际的性能优化策略
- React的工作流程可以简单概括为：
1. 交互（比如点击事件、useEffect）
2. 触发更新组件树render
- bailout发生在步骤2：组件树开始render后，命中了bailout的组件的子孙组件不会render。

### 与 React.memo的区别
- bailout 是父组件的状态没有变化，则可以不渲染子组件。优化的是组件更新前后 state 变没变化，没变化不 renconcile
- memo 的作用是，比较当前子组件接收的 props 是否变化，没变化，即使父组件的状态在变化，子组件也可以不渲染。优化的是组件接收父元素的 props，比较 props 前后发没发生变化，没变化再继续 bailut 的流程

### 一个 FiberNode 什么时候可以跳过 reconciler 流程呢？
- `reconciler`也就是 diff 决定的是是否复用已有的 `fiber` 还是根据当前的`element`创建一个新 fiber
- `element`是由`FunctionComponent`函数执行返回的结果，执行`FunctionComponent`会执行hook，遇到`updateState`会判断 state 是否变化，并标记`didReceiveUpdate`,满足则不用执行后续的`reconciler`,直接不进行后序 render 了

1. 这个节点的 props 且 type 没变，比较props​变化是通过 「全等比较」 ，使用React.memo​后会变为 「浅比较」
2. 这个节点上面的更新（state context）优先级小于此次更新优先级
3. state 没有变化
4. 开发者没有使用 shouldComponentUpdate 或 React.memo 来进行跳过

```ts {.line-numbers}
// 是否需要更新
let didReceiveUpdate = false;
// 递归中的递阶段
export const beginWork = (wip: FiberNode, renderLane: Lane) => {
	// bailout策略
	didReceiveUpdate = false;
	const current = wip.alternate;

	if (current !== null) {
		const oldProps = current.memoizedProps;
		const newProps = wip.pendingProps;
		// 1.先判断 props 和 type 是否相等
		if (oldProps !== newProps || current.type !== wip.type) {
			didReceiveUpdate = true;
		} else {
			//2. 判断此次更新是否包含 state context优先级，如果 updateLanes中包含renderLane，则跳过优化策略
			const hasScheduledStateOrContext = checkScheduledUpdateOrContext(
				current,
				renderLane
			);
			if (!hasScheduledStateOrContext) {

				didReceiveUpdate = false;

				switch (wip.tag) {
					case ContextProvider:
						const newValue = wip.memoizedProps.value;
						const context = wip.type._context;
						pushProvider(context, newValue);
						break;
					// TODO Suspense
				}

				return bailouOnAlreadyFinishedWork(wip, renderLane);
			}
		}
	}

	wip.lanes = NoLanes;

	// 比较，返回子fiberNode
	switch (wip.tag) {
		case FunctionComponent:
			return updateFunctionComponent(wip, wip.type, renderLane);
		case MemoComponent:
			return updateMemoComponent(wip, renderLane);
	}
	return null;
};

function bailouOnAlreadyFinishedWork(wip: FiberNode, renderLane: Lane) {
    //子树的优先级中也不包括renderLane，则跳过整棵子树的 render
	if (!includeSomeLanes(wip.childLanes, renderLane)) {
		if (__DEV__) {
			console.warn('bailout整棵子树', wip);
		}
		return null;
	}

    //子树中有更新的话，不需要通过reconciler生成子节点，直接 clone
	cloneChildFibers(wip);
	return wip.child;
}

function updateFunctionComponent(
	wip: FiberNode,
	Component: FiberNode['type'],
	renderLane: Lane
) {
	prepareToReadContext(wip, renderLane);
	// 有更新需要render生成 element
	const nextChildren = renderWithHooks(wip, Component, renderLane);

	const current = wip.alternate;
    //虽然有更新，但state没有变，不需要reconcileChildren来生成子 fiber，判断子 fiber 是否有更新，没有更新直接跳过子树的 render
	if (current !== null && !didReceiveUpdate) {
		bailoutHook(wip, renderLane);
		return bailouOnAlreadyFinishedWork(wip, renderLane);
	}

	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function updateState<State>(): [State, Dispatch<State>] {
	
	if (baseQueue !== null) {
        //比较 state 是否发生变化
		if (!Object.is(prevState, memoizedState)) {
			markWipReceivedUpdate();
		}

		hook.memoizedState = memoizedState;
		hook.baseState = newBaseState;
		hook.baseQueue = newBaseQueue;

		queue.lastRenderedState = memoizedState;
	}

	return [hook.memoizedState, queue.dispatch as Dispatch<State>];
}

export function bailoutHook(wip: FiberNode, renderLane: Lane) {
	const current = wip.alternate as FiberNode;
	wip.updateQueue = current.updateQueue;
    // 命中bailout会去掉 effect
	wip.flags &= ~PassiveEffect;
    //会把 current 上的 lanes 移除renderLane
	current.lanes = removeLanes(current.lanes, renderLane);
}
```

### memo 优化
```ts {.line-numbers}
function updateMemoComponent(wip: FiberNode, renderLane: Lane) {
	// bailout四要素
	// props浅比较
	const current = wip.alternate;
	const nextProps = wip.pendingProps;
	const Component = wip.type.type;

	if (current !== null) {
		const prevProps = current.memoizedProps;

		// 浅比较props
		if (shallowEqual(prevProps, nextProps) && current.ref === wip.ref) {
			didReceiveUpdate = false;
			wip.pendingProps = prevProps;

			// state context
			if (!checkScheduledUpdateOrContext(current, renderLane)) {
				// 满足四要素
				wip.lanes = current.lanes;
				return bailouOnAlreadyFinishedWork(wip, renderLane);
			}
		}
	}
	return updateFunctionComponent(wip, Component, renderLane);
}
```