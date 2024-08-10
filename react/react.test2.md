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