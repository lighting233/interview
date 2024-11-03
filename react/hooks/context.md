## context

### 更新问题
- 当前 `fiber` 存在更新的 lane 时不会命中 `beginwork` 的 `bailout`
- 在`updateContextProvider`中对比`pendingProps`和`memoizedProps`中的 value
- `propagateContextChange`从函数名可以看到，应该是要通知依赖该 `Context` 的其他 `FiberNode`，它的值已经发生了变化。具体来说，`propagateContextChange` 中会按照深度优先的方式从子树中查找依赖该 `Context` 的 `FiberNode`，将 render_lane 加入其 lanes 中，以及它的祖先（到 Context 的 Provider 截止）的 child_lanes 中
- 这样，当 `begin work` 执行到这些 `FiberNode` 时，由于 `child_lanes` 中包含了 `render_lane`，所以只会跳过他们本身，最后仍会到达依赖 `Context` 的那个 `FiberNode`，而它的 `lanes` 中包含了 `render_lane`，所以对应的组件会重新渲染，执行 useContext，得到新的值。
```ts {.line-numbers highlight=13}
switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip, renderLane);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null;
		case FunctionComponent:
			return updateFunctionComponent(wip, wip.type, renderLane);
		case Fragment:
			return updateFragment(wip);
		case ContextProvider:
			return updateContextProvider(wip, renderLane);
		case SuspenseComponent:
			return updateSuspenseComponent(wip);
		case OffscreenComponent:
			return updateOffscreenComponent(wip);
		case MemoComponent:
			return updateMemoComponent(wip, renderLane);
		default:
			if (__DEV__) {
				console.warn('beginWork未实现的类型');
			}
			break;
	}
	return null;
```
```ts {.line-numbers highlight=[5,11,14-15]}
function updateContextProvider(wip: FiberNode, renderLane: Lane) {
	const providerType = wip.type;
	const context = providerType._context;
	const newProps = wip.pendingProps;
	const oldProps = wip.memoizedProps;
	const newValue = newProps.value;

	pushProvider(context, newValue);

	if (oldProps !== null) {
		const oldValue = oldProps.value;

		if (
			Object.is(oldValue, newValue) &&
			oldProps.children === newProps.children
		) {
			return bailouOnAlreadyFinishedWork(wip, renderLane);
		} else {
			propagateContextChange(wip, context, renderLane);
		}
	}

	const nextChildren = newProps.children;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}
```
```ts {.line-numbers}
export function createContext(defaultValue) {
	const context = {
		$$typeof: REACT_CONTEXT_TYPE,
		Provider: null,
		// 初始值
		_currentValue: defaultValue
	};
	context.Provider = {
		$$typeof: REACT_PROVIDER_TYPE,
		_context: context
	};
	return context;
}

export function readContext<T>(
	consumer: FiberNode | null,
	context: ReactContext<T>
) {
	
	const value = context._currentValue;

	// 建立 fiber -> context
	const contextItem: ContextItem<T> = {
		context,
		next: null,
		memoizedState: value
	};

	if (lastContextDep === null) {
		lastContextDep = contextItem;
		consumer.dependencies = {
			firstContext: contextItem,
			lanes: NoLanes
		};
	} else {
		lastContextDep = lastContextDep.next = contextItem;
	}

	return value;
}
```

### 多个 context 嵌套问题
- 如果整棵fiber​树中之存在一个Context​，可以直接更新Context​对象，但是在实际的情况中可能会有多层嵌套
- 所以我们使用栈的形式来存储值，由于整个render​阶段的处理过程是先深度遍历，到达最深处节点后回溯，直到根节点。beginWork​由上至下，completeWork​由下至上。
所以在beginWork​流程中入栈，completeWork​流程出栈，可以满足每一层的对应关系。

```html {.line-numbers}
<ctx.Provider value={0}>
  <Cpn />
  <ctx.Provider value={1}>
    <Cpn />
    <ctx.Provider value={2}>
      <Cpn />
    </ctx.Provider>
  </ctx.Provider>
</ctx.Provider>
```