### 十、事件模型

#### 实现ReactDOM与Reconciler对接将事件回调保存在DOM中，通过以下两个时机对接：
- 创建DOM时 hostConfig中`createInstance`时执行`updateFiberProps`
- 更新属性时
  - 在`completeWork`中针对`HostComponent`保存在对应`FiberNode.updateQueue`中，并标记`update flag`,以数组的形式保存`[key1,value1,key2,value2]`
  - 在 commit 阶段根据 flag 执行`commitMutationEffects -> commitMutationEffectsOnFiber -> commitUpdate(finishedWork)`

- 在createRoot的 render 方法中进行`initEvent(container, validEventTypeList);`,为container添加addEventListener，执行dispatchEvent
  1. 收集沿途的事件 收集从目标元素到HostRoot之间所有目标回调函数
```ts
const collectPaths = (
	targetElement: PackagedElement,
	container: Container,
	eventType: string
): Paths => {
	const paths: Paths = {
		capture: [],
		bubble: []
	};
	// 收集事件回调是冒泡的顺序
	while (targetElement && targetElement !== container) {
		const eventProps = targetElement[elementEventPropsKey];
		if (eventProps) {
			const callbackNameList = getEventCallbackNameFromtEventType(eventType);
			if (callbackNameList) {
				callbackNameList.forEach((callbackName, i) => {
					const eventCallback = eventProps[callbackName];
					if (eventCallback) {
						if (i === 0) {
							// 反向插入捕获阶段的事件回调
							paths.capture.unshift(eventCallback);
						} else {
							// 正向插入冒泡阶段的事件回调
							paths.bubble.push(eventCallback);
						}
					}
				});
			}
		}
		targetElement = targetElement.parentNode as PackagedElement;
	}
	return paths;
};
```
  2. 构造合成事件
  3. 遍历captue
  4. 遍历bubble

#### React 使用合成事件系统带来了多个好处：

- 跨浏览器兼容性：统一的事件 API，消除浏览器间差异。
- 统一事件处理：提供一致的事件处理方式和事件模型。
- 性能提升：通过事件代理技术提高事件处理效率。
- 跨平台支持：在不同环境中提供一致的事件对象接口。

## 真正的事件模型
[真正的事件模型](https://juejin.cn/post/7313911431073022004)

### dom关联 fiber
```js
const randomKey = Math.random()
  .toString(36)
  .slice(2);
const internalInstanceKey = '__reactFiber$' + randomKey;

//node绑定 fiber
export function precacheFiberNode(
  hostInst: Fiber,
  node: Instance | TextInstance | SuspenseInstance | ReactScopeInstance,
): void {
  (node: any)[internalInstanceKey] = hostInst;
}

// react-dom-bindings/src/client/ReactDOMHostConfig.js
function createInstance(type, props, internalInstanceHandle) {
  // 创建真实的 DOM 节点
  const domElement = document.createElement(type);
  // 将真实的 DOM 节点和 workInProgress 关联起来
  preCacheFiberNode(internalInstanceHandle, domElement);
  // 将 props 挂载到真实 DOM 节点上
  updateFiberProps(domElement, props);
  return domElement;
}

```

### 收集队列
- `accumulateSinglePhaseListener` 接收四个参数，返回一个事件函数队列
- 这个函数的主要作用是从事件源对应的 Fiber 开始，向上遍历所有的父 Fiber(Fiber.return)，收集所有遍历到的节点中的事件函数，然后将事件函数保存到事件函数的队列中
```js
// react-dom-bindings/src/event/DOMPluginEventSystem.js
// targetFiber: 原生事件源所对应的 fiber
// reactName: react 事件名
// nativeEventType: 原生事件类型，比如 click
// isCapturePhase: true 是捕获，false 是冒泡
function accumulateSinglePhaseListener(targetFiber, reactName, nativeEventType, isCapturePhase) {
  // 捕获的事件名，react 事件名
  const captureName = reactName + "Capture";
  // 根据是否是捕获确定当前的事件名
  // 冒泡事件名 onClick
  // 捕获事件名 onClickCapture
  const reactEventName = isCapturePhase ? captureName : reactName;
  // 事件函数队列
  const listeners = [];

  // 从原生事件源所对应的 fiber 开始向上查找
  let instance = targetFiber;
  // 循环查找父 fiber，收集遍历到的事件函数
  while (instance !== null) {
    // 拿到当前 fiber 的 tag 和真实的 DOM 节点
    const { stateNode, tag } = instance;
    // 如果是原生 DOM 节点，且 DOM 节点真实存在
    if (tag === HostComponent && stateNode !== null) {
      // 拿到事件函数
      // instance: 原生事件源所对应的 fiber，也就是 workInProgress
      // registrationName: 注册的 react 事件名，比如 onClick，onClickCapture
      const listener = getListener(instance, reactEventName);
      // 如果事件函数存在，就添加到事件函数队列中
      if (listener) {
        // 将事件函数添加到队列中，这里没有直接添加，而是使用了一个 createDispatchListener 函数
        // 这个函数的作用是对事件函数进行包装，可以附加一些其他的信息，这是一种常用的编程手法
        // instance: 原生事件源所对应的 fiber，也就是 workInProgress
        // listener: 事件函数
        // stateNode: 真实的 DOM 节点
        listeners.push(createDispatchListener(instance, listener, stateNode));
      }
    }
    // 父 fiber
    instance = instance.return;
  }
  return listeners;
}

// react-dom-bindings/src/event/getListener.js
// instance: 原生事件源所对应的 fiber，也就是 workInProgress
// registrationName: 注册的 react 事件名，比如 onClick，onClickCapture
function getListener(instance, registrationName) {
  // 拿到真实的 DOM 节点
  const { stateNode } = instance;
  // 没有真实的 DOM 节点，直接返回 null
  if (stateNode === null) return null;
  // 拿到 DOM 节点上的 props
  const props = getFiberCurrentPropsFromNode(stateNode);
  // 如果没有 props，直接返回 null
  if (props === null) return null;
  // 拿到事件函数
  const listener = props[registrationName];
  // 将事件函数返回出去
  return listener;
}

// react-dom-bindings/src/client/ReactDOMComponentTree.js
function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}

// react-dom-bindings/src/events/DOMPluginEventSystem.js
// event：合成事件对象
// dispatchListeners：事件函数队列，[事件源对应的事件函数, 事件源父节点对应的事件函数, ..., div#root 对应的事件函数]
// isCapturePhase：true 表示捕获，false 表示冒泡
function processDispatchQueueItemsInOrder(event, dispatchListeners, isCapturePhase) {
  // 捕获阶段
  if (isCapturePhase) {
    // 捕获阶段是从后往前执行
    for (let i = dispatchListeners.length - 1; i >= 0; i--) {
      const { listener, currentTarget } = dispatchListeners[i];
      // 如果事件被阻止了，就不再执行
      if (event.isPropagationStopped()) {
        return;
      }
      executeDispatch(event, listener, currentTarget);
    }
  } else {
    // 冒泡阶段
    // 冒泡阶段是从前往后执行
    for (let i = 0; i < dispatchListeners.length; i++) {
      const { listener, currentTarget } = dispatchListeners[i];
      // 如果事件被阻止了，就不再执行
      if (event.isPropagationStopped()) {
        return;
      }
      executeDispatch(event, listener, currentTarget);
    }
  }
}
// 执行事件函数
function executeDispatch(event, listener, currentTarget) {
  event.currentTarget = currentTarget;
  // 传入事件对象
  listener(event);
}

```