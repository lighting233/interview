### ==react 的设计理念==

### react这种前端框架和 jQuery 这种库的区别？

### react与vue的区别？

### react核心模块操作的数据结构是？为什么不使用React Element作为核心模块？

### 如何生成fiberNode？

### react中我们涉及的节点类型

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

		this.tag = tag;
		this.key = key;
		this.stateNode = null;
		this.type = null;

		// 树结构
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

```

### 单节点更新流程


### deletion流程
### 十、事件模型

#### 实现ReactDOM与Reconciler对接将事件回调保存在DOM中，通过以下两个时机对接：

#### React 使用合成事件系统带来了多个好处：

#### 单节点 diff

#### 多节点 diff

#### commit阶段如何处理位置更新的节点？