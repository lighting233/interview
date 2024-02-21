## 1.diff

### 为什么引入diff

React 引入 diff 算法是为了提高 Virtual DOM 的性能。
在 React 中，当状态发生变化时，会重新构建 Virtual DOM，并通过 diff 算法比较新旧 Virtual DOM 的差异，然后只更新需要改变的部分，而不是重新渲染整个页面。
diff 算法的引入可以有效减少对实际 DOM 的操作次数，从而提高页面渲染的效率。通过只更新必要的部分，可以减少不必要的重绘和重排，提升页面性能和用户体验。

### 一个DOM节点在某一时刻最多会有4个节点和他相关。

- 1. current Fiber。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。
- 2. workInProgress Fiber。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。
- 3. DOM节点本身。
- 4. JSX对象。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。
Diff算法的本质是对比1和4，生成2。

### Diff的瓶颈以及React如何应对？

由于Diff操作本身也会带来性能损耗，React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中n是树中元素的数量。
为了降低算法复杂度，React的diff会预设三个限制：

- 1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
- 2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
- 3. 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

### 我们可以从同级的节点数量将Diff分为两类：

- 1. 当newChild类型为object、number、string，代表同级只有一个节点、
- 2. 当newChild类型为Array，同级有多个节点。

### 单节点diff
[单节点diff](https://react.iamkasong.com/diff/one.html#%E7%BB%83%E4%B9%A0%E9%A2%98)

### 多节点diff
[多节点diff](https://react.iamkasong.com/diff/multi.html#%E6%A6%82%E8%A7%88)

归纳下我们需要处理的情况：
- 1. 节点更新
- 2. 节点新增或减少
- 3. 节点位置变化

- React团队发现，在日常开发中，相较于新增和删除，更新组件发生的频率更高。所以Diff会优先判断当前节点是否属于更新。

- 基于以上原因，Diff算法的整体逻辑会经历两轮遍历：
第一轮遍历：处理更新的节点。
第二轮遍历：处理剩下的不属于更新的节点。

- 第一轮遍历
- 1. 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历
- 2. 如果不可复用，分两种情况：
    - key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。
    - key相同type不同导致不可复用，会将oldFiber标记为DELETION，并继续遍历
- 3. 如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

- 第一轮遍历可能产生四个结果
- 1. 同时遍历完
那就是最理想的情况：只需在第一轮遍历进行组件更新。此时Diff结束
- 2. newChildren没遍历完，oldFiber遍历完。
已有的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的newChildren为生成的workInProgress fiber依次标记Placement。
- 3. newChildren遍历完，oldFiber没遍历完
意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的oldFiber，依次标记Deletion。
- 4. newChildren与oldFiber都没遍历完
处理移动的节点：

为了快速的找到key对应的oldFiber，我们将所有还未处理的oldFiber存入以key为key，oldFiber为value的Map中。
接下来遍历剩余的newChildren，通过newChildren[i].key就能在existingChildren中找到key相同的oldFiber。
