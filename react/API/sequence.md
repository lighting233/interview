# sequence

## 配合使用
1. Lazy 组件
2. transition fallback​（比如 useTransition​）
3. use
4. Offscreen​ 组件

![结构示意图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81fa8a0a9cf84bf3adce0d90671b3072~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1690&h=1017&s=107594&e=png&b=ffffff)
```js {.line-numbers}
function updateSuspenseComponent(workInProgress) {
	// 获取current树对应节点
	const current = workInProgress.alternate;
	// 获取属性
	const nextProps = workInProgress.pendingProps;
	// 挂起状态？是否显示fallback
	let showFallback = false;
	// 是否是挂起状态？
	const didSuspend = (workInProgress.flags & DidCapture) !== NoFlags;

	// 设置showFallback为true 并移除挂起标记
	if (didSuspend) {
		showFallback = true;
		workInProgress.flags &= ~DidCapture;
	}

	// 分别获取子级：offscreen子级
	const nextPrimaryChildren = nextProps.children;
	// fragment子级
	const nextFallbackChildren = nextProps.fallback;
	// 保存suspense组件栈
	pushSuspenseHandler(workInProgress);

	if (current === null) {
		// mount阶段
		if (showFallback) {
			// 挂起
			// 初始化挂起阶段结构 fragement
			return mountSuspenseFallbackChildren(
				workInProgress,
				nextPrimaryChildren,
				nextFallbackChildren
			);
		} else {
			// 正常
			// 初始化正常流程结构 offscreen
			return mountSuspensePrimaryChildren(workInProgress, nextPrimaryChildren);
		}
	} else {
		// update阶段
		if (showFallback) {
			// 挂起
			// 更新阶段挂起结构 fragement
			return updateSuspenseFallbackChildren(
				workInProgress,
				nextPrimaryChildren,
				nextFallbackChildren
			);
		} else {
			// 正常
			// 更新阶段正常结构 offscreen
			return updateSuspensePrimaryChildren(workInProgress, nextPrimaryChildren);
		}
	}
}

function mountSuspenseFallbackChildren(
	workInProgress,
	primaryChildren,
	fallbackChildren
) {
    //通过 mode 属性区分显隐
	const primaryChildProps = {
		mode: 'hidden',
		children: primaryChildren
	};
	// 创建offscreen 正常流程分支
	const primaryChildFragment = createFiberFromOffscreen(primaryChildProps);
	// 创建fragment 挂起流程分支
	const fallbackChildFragment = createFiberFromFragment(fallbackChildren, null);

	// 通过return指向父节点
	primaryChildFragment.return = workInProgress;
	fallbackChildFragment.return = workInProgress;
	primaryChildFragment.sibling = fallbackChildFragment;
	workInProgress.child = primaryChildFragment;

	return fallbackChildFragment;
}

```

## 如何被触发
[sequence如何被触发](https://juejin.cn/post/7347190677505490978#heading-16)
当某一次更新时，在`<Suspense />​`组件的子组件中使用了use​这个hook，由于use​函数的返回值此时尚未处于完成状态，所以需要显示中间状态，也就是需要创建挂起流程的节点。
但是问题是，目前beginWork​函数创建fiber​节点已经进行到了正常流程下面的子树，按照我们之前实现的挂起流程的逻辑，是将挂起流程的子树节点放在Suspense​节点的直接子级。
例如下图中在`<Cpn />​`组件中定义的use​函数发生状态变更，需要创建挂起流程的fiber​节点，所以需要先从`<Cpn />​`这个函数节点开始向上寻找，找到最近的父级Suspense​节点，然后创建挂起流程的fiber​节点。这个过程是render​阶段的一个新流程 —— `unwind​`流程。
下图为状态变更时（visible​ --> hidden​），beginWork​执行流向。
![向上寻找父节点](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b8b5bb5da7843588b4c55a5e3e16684~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1666&h=906&s=108738&e=png&b=121212)

```js
function renderRoot(root, lane, shouldTimeSlice) {

	// ...

	do {
		try {
			// 上一次抛出了错误
			if (
				workInProgressSuspendedReason !== NotSuspended &&
				workInProgress !== null
			) {
				const thrownValue = workInProgressThrownValue;
				// 重置为初始状态，防止后续执行时出错
				workInProgressSuspendedReason = NotSuspended;
				workInProgressThrownValue = null;
				// unwind的执行流程
				throwAndUnwindWorkLoop(root, workInProgress, thrownValue, lane);
			}
	
			// 正常的流程
			workLoop();
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn('workLoop发生错误', e);
			}
			// 抛出错误
			handleThrow(root, e);
		}
	} while (true);

	// ...

}
const NotSuspended = 0;
const SuspendedOnData = 6;
// 后续用于流程判断的标记 可以先简单看作是否处于suspense逻辑中的判断依据
let workInProgressSuspendedReason = NotSuspended;
let workInProgressThrownValue = null;

function handleThrow(root, thrownValue) {
	if (thrownValue === SuspenseException) {
		// 后续用于流程判断的标记
		workInProgressSuspendedReason = SuspendedOnData;
		thrownValue = getSuspenseThenable();
	}
	// 保存
	workInProgressThrownValue = thrownValue;
}

// suspendedThenable是use函数中保存thenable的全局变量
function getSuspenseThenable() {
	// 在获取thenable时，判断是否有值
	if (suspendedThenable === null) {
		throw new Error('应该存在suspendedThenable');
	}
	const thenable = suspendedThenable;
	// 重置 suspendedThenable
	suspendedThenable = null;
	return thenable;
}

function throwAndUnwindWorkLoop(
	root,
	unitOfWork,
	thrownValue,
	lane
) {
	// 创建触发更新任务
	throwException(root, thrownValue, lane);
	// 回溯到Suspense节点
	unwindUnitOfWork(unitOfWork);
}

// 获取最新的（最近）Suspense
export function getSuspenseHandler() {
	return suspenseHandlerStack[suspenseHandlerStack.length - 1];
}

export function throwException(root, value, lane) {
	// 判断是否为合法的use函数返回值 一个Promise
	if (
		value !== null &&
		typeof value === 'object' &&
		typeof value.then === 'function'
	) {
		const weakable = value;
		// 获取最新的（最近）Suspense
		const suspenseBoundary = getSuspenseHandler();
		// 为该Suspense节点标记ShouldCapture
		if (suspenseBoundary) {
			suspenseBoundary.flags |= ShouldCapture;
		}
		// 创建更新任务
		attachPingListener(root, weakable, lane);
	}
}
function attachPingListener(
	root,
	wakeable,
	lane
) {
	let pingCache = root.pingCache;
	let threadIDs;
	// 定义缓存值
	if (pingCache === null) {
		// 无缓存时，根据wakeable为key创建
		threadIDs = new Set();
		pingCache = root.pingCache = new WeakMap();
		pingCache.set(wakeable, threadIDs);
	} else {
		threadIDs = pingCache.get(wakeable);
		if (threadIDs === undefined) {
			threadIDs = new Set();
			pingCache.set(wakeable, threadIDs);
		}
	}
	if (!threadIDs.has(lane)) {
		// 第一次进入
		threadIDs.add(lane);
		// 定义then函数
		function ping() {
			if (pingCache !== null) {
				pingCache.delete(wakeable);
			}
			// 调度更新的入口函数，可以简单看作调用了一次更新
			ensureRootIsScheduled(root);
		}
		wakeable.then(ping, ping);
	}
}
function unwindUnitOfWork(unitOfWork) {
	let incompleteWork = unitOfWork;
	do {
		// 是否为Suspense?不是的话返回null
		const next = unwindWork(incompleteWork);
		// 如果找到了，将此节点赋值给workInProgress
		// workInProgress是作为render阶段下一次执行的节点
		if (next !== null) {
			workInProgress = next;
			return;
		}
		// 没找到，继续向上查找
		const returnFiber = incompleteWork.return;
		// 清除副作用，deletions为待删除的节点集合
		if (returnFiber !== null) {
			returnFiber.deletions = null;
		}
		incompleteWork = returnFiber;
	} while (incompleteWork !== null);

	// 没有 边界 中止unwind流程，一直到root
	workInProgress = null;
}
export function unwindWork(wip) {
	const flags = wip.flags;
	switch (wip.tag) {
		case SuspenseComponent:
			// 移除当前Suspense节点
			popSuspenseHandler();
			if (
				(flags & ShouldCapture) !== NoFlags &&
				(flags & DidCapture) === NoFlags
			) {
				// 更改标记
				// 此逻辑相当于先删除ShouldCapture标记，然后赋值为DidCapture标记
				wip.flags = (flags & ~ShouldCapture) | DidCapture;
				return wip;
			}
			return null;
	}
}

```
- 如何查找最近的`Suspense​`？还记得前面我们在进入`Suspense​`节点的`beginWork​`时保存了一个`Suspense`​节点的栈结构（后入先出）：
- 整个`fiber​`树的遍历形式是深度优先遍历，然后通过`beginWork`​向下遍历，`completeWork​`回溯，所以在`completeWork​`流程回到`Suspense​`节点时要出栈
- 取出最近的`Suspense​`节点，为其加入`ShouldCapture​`标记，代表该`Suspense​`节点下面需要进行`unwind​`流程，
- 当`unwind​`流程回溯到达此S`uspense`​节点后，再将标记更改为`DidCapture​`，代表需要切换到挂起状态。接下来就会开始在`beginWork​`中执行挂起流程的逻辑。
- 由于创建的更新任务不是立即被执行，所以为了避免在等待的过程中多次被调用执行同一个函数的情况，使用`WeakMap`​缓存每次的`wakeable​`作为`key​`，保存`wakeable​`的`lane​`（优先级标记）。
- 只为第一次进入此逻辑的优先级创建更新任务。
- 为`wakeable​`挂载`then​`函数，`Promise​`状态确定后会执行此`then`​函数，执行时需要清除掉`pingCache​`缓存。
- `DidCapture​`，代表需要进入挂起流程，创建挂起流程的中间状态节点。此时渲染在页面中的是`fallback​`中的内容。
- 当`Promise​`中的状态确定后，执行触发更新的`then​`函数，此时 `react` 会重新触发一次更新，再次进行到`Suspense​`节点时，由于上次创建挂起流程后`DidCapture​`标记已经被移除，所以本次更新会创建正常流程的节点，再次进入
- `<Cpn />​`这个函数组件时，再次执行`use()​`函数，由于此时传入`use​`的`Promise​`已经返回了状态，变为`fulfilled​`状态，所以会在内部直接返回`thenable​`的值，最终显示正常的页面内容。

