### ==react 的设计理念==

### react这种前端框架和 jQuery 这种库的区别？
- jQuery过程驱动
- react 数据驱动 ==通过描述 ui，核心模块调用宿主环境 api，来显示真实 ui==

### react与vue的区别？

1. vue 使用模版语法，可以有编译优化，核心库 renderer
2. react 使用 jsx，核心库 reconciler

### react核心模块操作的数据结构是？为什么不使用React Element作为核心模块？

- React Element没有与其他节点进行关联
- 只记录数据没有状态
### 如何生成fiberNode？

- ~~当前 fiber 由它的父 fiber 和其对应的React Element对比生成~~

### react中我们涉及的节点类型

1. jsx
2. React Element
3. fiber node
4. dom element
### fiberNode

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

		//FunctionComponent HostComponent
		this.tag = tag;
		this.key = key;
		//HostComponent 记录 dom 节点
		this.stateNode = null;
		//HostComponent 就是节点信息 div FunctionComponent 就是函数本身
		this.type = null;

		// 树结构
		//每个 fiber 即是数据单元，也是执行单元，当前工作单元执行完，返回其父节点
		//todo 当前工作单元完成工作，就应该是他的父 fiber node 来执行工作
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
		//placement deletionchild update
		//todo Placement,Update,ChildDeletion
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

### react触发更新的方法,

### ReactDOM.createRoot().render的流程
- FiberRootNode
- HostRootFiber
- HostRootFiber的 updateQueue
- 执行render 方法执行updateContainer
- 给 App 创建 update，插入hostRootFiber.updateQueue
- 执行scheduleUpdateOnFiber
### 初始渲染如何链接到更新模式的

### 整个更新流程的目的

### 初始渲染到bigenWork的流程

### 递归，递的过程

#### 标记Placement的依据
#### `beginWork`性能优化策略

### 递归，归的过程

#### 创建 dom 的依据

#### completeWork性能优化策略，flags分布在不同fiberNode中，如何快速找到他们?
### update的数据结构

### updateQueue的数据结构

### 为什么 react 中断更新后能在下一次继续使用未更新的 update 作为更新依据？


### 七、commit 阶段

#### 为什么首屏能一次性插入整体的 dom，而不是一个一个 placement？

### 九、FunctionComponent

#### hook存储位置，数据结构
- 
#### 为什么 hook 不能放在条件语句，要按顺序执行

#### useState

```ts
function mountState(initialState) {
	//1.创建当前要操作的 hook
	const hook = mountWorkInProgressHook();
	//2.处理 hook 的memorizeState
	let memosizeState;
	if(initialState instanceof Function) {
		memosizeState = initialState();
	}else {
		memosizeState = initialState;
	};
	//3.创建 hook 的 updatequeue
	const queue = createUpdateQueue();
	hook.updateQueue = queue;
	//4.处理 dispatch 方法
	//todo currentlyRenderingFiber, queue
	const dispatch = hook.dispatch = (dispatchSetState.bind(null,currentlyRenderingFiber,queue));

	return [memosizeState, dispatch]
}

function dispatchSetState(fiber,updateQueue, action) {
	//todo action
	const update = createUpdate(action);
	enqueueUpdate(updateQueue, update);
	scheduleUpdateOnFiber(fiber)
}


function monutWorkInProcessHook() {
    return {
        next:null,
        //todo memoizedState
        // baseState: null,
        memoizedState:null,
        updateQueue: {}
    }
}
//todo mountState
function mountSetState (initialState) {
    const hoook = monutWorkInProcessHook();
    let memorizeState;

    if(initialState instanceof Function) {
        memorizeState = initialState();
    }else {
        memorizeState = initialState;
    };

    //todo 
    const queue = createUpdateQueue();
    // const update = createUpdate();
    //todo
    hook.updateQueue = queue;
    //todo dispatchSetState
    const dispatch = hook.dispatch = setStateDispatch.bind(null,currentlyRenderingFiber,queue);

    return [memorizeState, dispatch];
};

function setStateDispatch(fiber, queue, action) {
    //todo
    const update = createUpdate(action);
    enqueueUpdate(queue,update);
    scheduleUpdateOnFiber(fiber)
}

function updateState() {
	const hook = updateWorkInProcessHook();
	const queue = hook.shared.pending;
	//todo baseState, memorizeState
	const baseState = hook.memorizeState;

	hook.memorizeState = processUpdateQueue(base,queue,currentlyrenderingFiber)
	return [hook.memorizeState,queue.dispatch]
}
```

### 单节点更新流程
- key
- type

### deletion流程
### 十、事件模型

#### 实现ReactDOM与Reconciler对接将事件回调保存在DOM中，通过以下两个时机对接：

#### React 使用合成事件系统带来了多个好处：

