### 一、==react 的设计理念==
- js库 提供 ui层面的解决方案
- 单向数据流
- 我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。
- 构建快速响应，其中的关键是解决 CPU 的瓶颈与 IO 的瓶颈

---
### 二、使用 react 这个库开发和传统的使用 jQuery 开发有什么区别？

- jQuery 是过程驱动，使用 jQuery 调用宿主环境 API，来显示真实 UI
- 使用前端框架把过程驱动变为**状态（数据）**驱动 
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
- 
reconciler的工作方式对于同一个节点，比较其**React Element** 与 **fiberNode** 生成子 **fiberNode**。
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
