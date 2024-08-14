### 一、react 的设计理念
#### 我们认为，React 是用 JavaScript 构建==快速响应==的==大型== Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。
- **构建快速响应**，其中的关键是解决 CPU 的瓶颈与 IO 的瓶颈
  1. **CPU瓶颈**：fiber 架构，实现异步可中断，虚拟 dom，diff 算法优化渲染
  2. **IO 的瓶颈**：schedule 调度，设置优先级，提供上层 api-hooks，优化交互体验

- **大型**，其中的关键是组件化，跨端和安全性
  1. **组件化**：单项数据流，jsx 描述 ui，all in js提供更高的灵活性，组件话开发，与传统 jQuery 命令式开发不同，声明式开发更利于组件化。
  2. **跨端跨浏览器**：虚拟 dom 可以通过核心包调用不同宿主环境的 api 给不同宿主环境使用，本身是一个 js 库，一些合成事件磨平浏览器间的差异。
  3. **安全**：不直接操作 ui，提供 xss 检测，开发更加安全

---
### 二、使用 react 这个库开发和传统的使用 jQuery 开发有什么区别？

- jQuery 是过程驱动，使用 jQuery 调用宿主环境 API，来显示真实 UI
- 使用前端框架把过程驱动变为**状态(数据)驱动**
- 前端框架运行时的核心模块在调用宿主环境的 API，来显示真实 UI,开发者要做的是描述 UI
- react 的运行时的核心模块**reconciler**，描述 UI 的方法是 JSX，react 是一个纯运行时前端框架，核心模块可以开放一些通用的 API 供一些不同的宿主环境使用
- vue 的运行时的核心模块**renderer**，描述 UI 的方法是模版语法，模版语法可以有**编译优化**

---

### 三、react核心模块操作的数据结构是？

React Element如果作为核心模块操作的数据结构，存在的问题:
- 无法表达节点之间的关系。
- 字段有限，不好拓展(比如:无法表达状态)
  
所以，需要一种新的数据结构，他的特点:

- 介于React Element与真实UI节点之间
- 能够表达节点之间的关系
- 方便拓展(不仅作为数据存储单元，也能作为工作单元)

这就是FiberNode虚拟DOM在React中的实现)
当前我们了解的节点类型:
- Jsx
- React Element
- FiberNode
- DOM Element
  
~~reconciler的工作方式对于同一个节点，比较其**React Element** 与 **fiberNode** 生成子 **fiberNode**~~。
reconciler的工作方式对于同一个节点比较当前 fiberNode的子 current Fiber 和 对应的 子React Element 生成子  wip Fiber Node
并根据比较的结果生成不同标记(插入、删除、移动.....)，对应不同宿主环境API的执行

```ts
export class FiberNode {
	pendingProps: Props;
	memoizedProps: Props | null;
	key: Key;
	stateNode: any;
	type: any;
	ref: Ref;
	tag: WorkTag;
	flags: Flags;
	subtreeFlags: Flags;
	deletions: FiberNode[] | null;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	updateQueue: unknown;
	memoizedState: any;

	alternate: FiberNode | null;

	lanes: Lanes;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
        //类型如 export const FunctionComponent = 0;
		this.tag = tag;
		this.key = key;
        //对于HostComponent来说就保存了<div> div dom
		this.stateNode = null;
        //对于FunctionComponent来说就是 function 本身
		this.type = null;

		// 树结构
        //fiber当做工作单元，当前工作单元完成工作，就应该是他的父 fiber node 来执行工作 
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 状态
		this.pendingProps = pendingProps;
		this.memoizedProps = null;
		this.updateQueue = null;
		this.memoizedState = null;

		// 副作用
        //Placement,Update,ChildDeletion
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.deletions = null;

		// 调度
		this.lanes = NoLane;
		// this.childLanes = NoLanes;

		this.alternate = null;
	}
}
```

---

### 四、react触发更新的方法,ReactDOM.createRoot().render的流程
常见触发更新的方式：
1. ReactDOM.createRoot().render  (ReactDOM.render)
   ![入口](../img/fiberrootnode.png)
2. this.setState
3. useState，useReducer的dispatch方法
4. useContext

不常见的：
1. this.forceUpdate() 

[ReactDOM.createRoot().render的流程](./react.ts)

#### 整个更新流程的目的
1. 生成 wip fiberNode 树
2. 标记副作用 flags
### 五、递归，递的过程

- `beginWork`中比较当前 fiberNode的子 current Fiber 和 对应的 子React Element 生成子  wip Fiber Node
- mount/reconcile只负责 Placement(插入)/Placement(移动)/ChildDeletion(删除)
- 标记Placement的依据，fiber.alternate === null
- ？？更新（文本节点内容更新、属性更新）在completeWork中，对应Update flag
- mount 阶段只有hostfoot.fiber.child被标记了 placement
- update 阶段其他需要新增的节点也会标记placement

#### `beginWork`性能优化策略
- 一个节点下可能有很多个子节点，都标记了placement，那就要插入 dom 多次，我们可以建立好一个离屏dom 树，对 div 进行一次整体的placement操作。
- 这是针对 mount 流程的，update 流程只更新局部节点

```ts {.line-numbers}
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber, workInProgressRootRenderLane);
	// 执行完beginWork后，pendingProps 变为 memoizedProps
	fiber.memoizedProps = fiber.pendingProps;
	// 归的阶段
	if (next === null) {
		 completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function workLoopSync() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function workLoopConcurrent() {
	while (workInProgress !== null && !schedulerShouldYield()) {
		performUnitOfWork(workInProgress);
	}
}

function renderRoot(
	root: FiberRootNode,
	lanes: Lanes,
	shouldTimeSlice: boolean
) {
	if (__LOG__) {
		console.log(`开始${shouldTimeSlice ? '并发' : '同步'}render阶段`, root);
	}
	const prevExecutionContext = executionContext;
	executionContext |= RenderContext;

	// 初始化操作
	 (root, lanes);

	// render阶段具体操作
	do {
		try {
			shouldTimeSlice ? workLoopConcurrent() : workLoopSync();
			break;
		} catch (e) {
			console.error('workLoop发生错误', e);
			workInProgress = null;
		}
	} while (true);

	executionContext = prevExecutionContext;

	if (shouldTimeSlice && workInProgress !== null) {
		return RootIncomplete;
	}
	if (!shouldTimeSlice && workInProgress !== null) {
		console.error('render阶段结束时wip不为null');
	}

	workInProgressRootRenderLane = NoLane;
	return RootCompleted;
}
```

### 六、递归，归的过程

- `completeWork`
- 对于 Host 类型的 fiberNode，构建离屏 dom 树
- ？？标记 update flag
- 创建 dom 节点，并递归查找子节点，把子节点插入当前的 dom
- 创建 dom 并插入的依据 workInProgress.alternate === null && workInProgress.stateNode === null
- mount 阶段会进入上边的条件中，创建并插入 dom 到 parent 中
- update 阶段只会根据 placement 创建 dom，但不插入。
#### completeWork性能优化策略，flags分布在不同fiberNode中，如何快速找到他们?
答案:利用completeWork向上遍历(归)的流程，将子fiberNode的flags冒泡到父fiberNode
每个节点的subtreeFlags记录了子树上是否有 flags

```ts {.line-numbers}
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		const next = completeWork(node);
		
		if (next !== null) {
			workInProgress = next;
			return;
		}

		const sibling = node.sibling;
		//有兄弟遍历兄弟
		if (sibling) {
			workInProgress = sibling;
			return;
		}
		//没有兄弟返回父节点
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
```

### 七、Update数据结构

```ts {.line-numbers}
//hooks
export type Update<S, A> = {|
  lane: Lane,
  action: A,
  hasEagerState: boolean,
  eagerState: S | null,
  next: Update<S, A>,
|};

export type UpdateQueue<S, A> = {|
  pending: Update<S, A> | null,
  lanes: Lanes,
   : (A => mixed) | null,
  lastRenderedReducer: ((S, A) => S) | null,
  lastRenderedState: S | null,
|};
//class
export type Update<State> = {|
  // TODO: Temporary field. Will remove this by storing a map of
  // transition -> event time on the root.
  eventTime: number,
  lane: Lane,
  tag: 0 | 1 | 2 | 3,
  payload: any,
  callback: (() => mixed) | null,
  next: Update<State> | null,
|};

export type SharedQueue<State> = {|
  pending: Update<State> | null,
  lanes: Lanes,
|};

export type UpdateQueue<State> = {|
  baseState: State,
  firstBaseUpdate: Update<State> | null,
  lastBaseUpdate: Update<State> | null,
  shared: SharedQueue<State>,
  effects: Array<Update<State>> | null,//数组。保存update.callback !== null的Update
|};
```

#### 为什么 react 中断更新后能在下一次继续使用未更新的 update 作为更新依据？
因为每次在创建 wip 时执行`createWorkInProgress`，会进行`wip.updateQueue = current.updateQueue;`,因为Update存在`UpdateQueue.shared.pending`上，所以wip 和 current fiber 中共用 update。

### 八、commit 阶段

#### 为什么首屏能一次性插入整体的 dom，而不是一个一个 placement？
在Mutation阶段,当节点有subtreeFlags时，则继续向下遍历，直到节点只有自身的 flags，然后向上遍历，此时虽然执行commitMutationEffectsOnFiber方法里会插入 dom 节点，但首屏时这些节点还没有挂在到页面上，直到遍历到根，一次性挂载

```ts {.line-numbers highlight=[15-15]}
export const commitMutationEffects = (
	finishedWork: FiberNode,
	root: FiberRootNode
) => {
	nextEffect = finishedWork;

	while (nextEffect !== null) {
		// 向下遍历
		const child: FiberNode | null = nextEffect.child;

		if (
			(nextEffect.subtreeFlags & (MutationMask | PassiveMask)) !== NoFlags &&
			child !== null
		) {
			nextEffect = child;
		} else {
			// 向上遍历
			up: while (nextEffect !== null) {
				commitMutationEffectsOnFiber(nextEffect, root);
				const sibling: FiberNode | null = nextEffect.sibling;

				if (sibling !== null) {
					nextEffect = sibling;
					break up;
				}
				nextEffect = nextEffect.return;
			}
		}
	}
};
```

### 九、FunctionComponent

#### hook存储位置，数据结构
- 存在当前functionfiber 的fiber 的memoizedState上

```ts
interface Hook {
	memoizedState: any;
	// 对于state，保存update相关数据
	updateQueue: unknown; //useState会触发更新，所以也需要 update 对象
	// 对于state，保存开始更新前就存在的updateList（上次更新遗留）
	baseQueue: Update<any> | null;
	// 对于state，基于baseState开始计算更新，与memoizedState的区别在于上次更新是否存在跳过
	baseState: any;
	next: Hook | null;
}
```
#### 为什么 hook 不能放在条件语句，要按顺序执行
- renderWithHooks时`currentlyRenderingFiber = workInProgress;`执行 hook 时如果currentlyRenderingFiber为空说明在 react 外部调用了 hook
- 当`workInProgressHook === null`时，说明是当前函数的第一个 hook，在 mount 阶段会创建 hook
- hook 以链表的形式在`Fiber.memoizedState`上进行存储，每执行完一个，指针移动到 next，所以是按顺序执行

#### useState

```ts
function dispatch(
	fiber,
	updateQueue,
	action
) {
	const update = createUpdate(action);
	enqueueUpdate(updateQueue, update);
	scheduleUpdateOnFiber(fiber);
}

function mountState(initialState) {
	const hook = mountWorkInProgressHook();
	let memoizedState;
	if (initialState instanceof Function) {
		memoizedState = initialState();
	} else {
		memoizedState = initialState;
	}
	hook.memoizedState = memoizedState;
	const queue = createUpdateQueue();
	hook.updateQueue = queue;

	// @ts-ignore
	const dispatch = dispatchSetState.bind(
		null,
		currentlyRenderingFiber,
		queue
	));

	return [memoizedState, dispatch];
}
```

### 单节点更新流程

1. key 是否相同
2. type 是否相同
3. 都相同复用
4. 删除节点时，除了第一个需要标记 deletion，剩下的都加入parentfiber.deletions数组中   
   - 删除节点时需要递归子树，如果子树是 functioncomponent需要执行 effect 的回调，对于 hostcomponent 需要解绑 ref，对于子组件需要找他子节点对应的 dom
   - 删除也是深度优先遍历和 beginwork and completework顺序一样