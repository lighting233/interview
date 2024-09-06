## eagerState

### 对于如下这个常见交互步骤：
1. 点击按钮，触发状态更新
2. 组件render
3. 视图渲染

- 可以优化的步骤是 1 和 2
- 对于「步骤1」，如果状态更新前后没有变化，则可以略过剩下的步骤。这个优化策略被称为eagerState
- 对于「步骤2」，如果组件的子孙节点没有状态变化，可以跳过子孙组件的render。这个优化策略被称为bailout

### 优化的条件
- 更新拥有自己的优先级，所以在render前不能确定「究竟是哪些更新会参与状态的计算」。所以，在这种情况下组件必须render，useState必须执行才能知道num的最新状态是多少。
- 当不存在更新时，本次更新就是组件的第一个更新。在只有一个更新的情况下是能确定最新状态的。当前组件不存在更新，那么首次触发状态更新时，就能立刻计算出最新状态，进而与当前状态比较。如果两者一致，则省去了后续render的过程。

### 要考虑两个 fiber 树
- 一个保存「当前视图」对应的相关信息，被称为**current fiber**
- 一个保存「接下来要变化的视图」对应的相关信息，被称为**wip fiber**，`updateNum`中被预设的是`wip fiber`。
- 当组件触发更新后，会在组件对应的2个fiber上都「标记更新」
- wip 当前优先级的任务执行完后进入 commit（可能树上还存在低优先级的 lane 被跳过），然后在 mountion 阶段后，切换 fiber 树，这时新的 wip 树带着上一次被跳过的优先级
```ts {.line-numbers highlight=[20-23]}
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>,
	fiber: FiberNode,
	lane: Lane
) => {
	const pending = updateQueue.shared.pending;
	if (pending === null) {
		// pending = a -> a
		update.next = update;
	} else {
		// pending = b -> a -> b
		// pending = c -> a -> b -> c
		update.next = pending.next;
		pending.next = update;
	}
	updateQueue.shared.pending = update;

	fiber.lanes = mergeLanes(fiber.lanes, lane);
	const alternate = fiber.alternate;
	if (alternate !== null) {
		alternate.lanes = mergeLanes(alternate.lanes, lane);
	}
};
```
- 当组件render时，useState会执行，计算出新的状态，并把wip fiber上的「更新标记」清除。
- 当视图完成渲染后，current fiber与wip fiber会交换位置（也就是说本次更新的wip fiber会变为下次更新的current fiber）
- 变成：wip fiber存在更新，current fiber不存在更新。



```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [num, updateNum] = useState(0);
  console.log("App render", num);

  return (
    <div onClick={() => updateNum(1)}>
      <Child />
    </div>
  );
}

function Child() {
  console.log("child render");
  return <span>child</span>;
}
//第一次点击div,打印：
//App render 1
//child render 

//第二次点击div时，由于wip fiber存在更新，没有命中eagerState，但执行了 app 的 render，命中了 state 相等的 bailout
//App render 1

//第三次点击div时什么都不打印，因为第二次 命中 bailout 时移除了 current 上的更新 lane，所以第三次点击命中 eigerState
```

```ts {.line-numbers highlight=[11-14]}
function dispatchSetState<State>(
	fiber: FiberNode,
	updateQueue: FCUpdateQueue<State>,
	action: Action<State>
) {
	const lane = requestUpdateLane();
	const update = createUpdate(action, lane);

	// eager策略
	const current = fiber.alternate;
	if (
		fiber.lanes === NoLanes &&
		(current === null || current.lanes === NoLanes)
	) {
		// 当前产生的update是这个fiber的第一个update
		// 1. 更新前的状态 2.计算状态的方法
		const currentState = updateQueue.lastRenderedState;
		const eagarState = basicStateReducer(currentState, action);
		update.hasEagerState = true;
		update.eagerState = eagarState;

		if (Object.is(currentState, eagarState)) {
			enqueueUpdate(updateQueue, update, fiber, NoLane);
			// 命中eagerState
			if (__DEV__) {
				console.warn('命中eagerState', fiber);
			}
			return;
		}
	}

	enqueueUpdate(updateQueue, update, fiber, lane);

	scheduleUpdateOnFiber(fiber, lane);
}
```

[习题1](https://juejin.cn/post/7103831309767671816?share_token=2efecc3a-2185-42d2-9153-784d2f434a46)
[习题2](https://juejin.cn/post/7355394311674445876?searchId=2024041610351131C6761B182B90001A55#heading-3)
[习题3](https://zhuanlan.zhihu.com/p/652752827)

