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