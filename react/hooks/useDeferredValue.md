```ts
function mountDeferredValue(value) {
  var _mountState = mountState(value),
      prevValue = _mountState[0],
      setValue = _mountState[1];

  mountEffect(function () {
    var prevTransition = ReactCurrentBatchConfig$2.transition;
    ReactCurrentBatchConfig$2.transition = 1;

    try {
      setValue(value);
    } finally {
      ReactCurrentBatchConfig$2.transition = prevTransition;
    }
  }, [value]);
  return prevValue;
}

function mountDeferredValue(value) {
  const [prevState,setState] = mountState(value),

  mountEffect(function () {
    const prevTransition = ReactCurrentBatchConfig$2.transition;
    ReactCurrentBatchConfig$2.transition = 1;

    try {
      setState(value);
    } finally {
      ReactCurrentBatchConfig$2.transition = prevTransition;
    }
  }, [value]);
  return prevState;
}

function mountDeferredValue<T>(value: T): T {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = value;
  return value;
}

function updateDeferredValue(value){
  const hook = updateWorkInProgressHook();
  const resolvedCurrentHook = currentHook;
  const prevValue = resolvedCurrentHook.memoizedState;
  return updateDeferredValueImpl(hook, prevValue, value);
}

//是否包含紧急任务，返回 false 说明有紧急任务
export function includesOnlyNonUrgentLanes(lanes: Lanes) {
  const UrgentLanes = SyncLane | InputContinuousLane | DefaultLane;
  return (lanes & UrgentLanes) === NoLanes;
}

function updateDeferredValueImpl(hook, prevValue, value) {
  const shouldDeferValue = !includesOnlyNonUrgentLanes(renderLanes);
  if (shouldDeferValue) {

    if (!is(value, prevValue)) {
      const deferredLane = claimNextTransitionLane();
      currentlyRenderingFiber.lanes = mergeLanes(
        currentlyRenderingFiber.lanes,
        deferredLane,
      );
      markSkippedUpdateLanes(deferredLane);

      hook.baseState = true;
    }
    return prevValue;
  } else {
    
    if (hook.baseState) {
      hook.baseState = false;
      markWorkInProgressReceivedUpdate();
    }

    hook.memoizedState = value;
    return value;
  }
}
```
## 延迟一个值与防抖和节流之间有什么不同？
**防抖** 是指在用户停止输入一段时间（例如一秒钟）之后再更新列表。
**节流** 是指每隔一段时间（例如最多每秒一次）更新列表。
虽然这些技术在某些情况下是有用的，但 useDeferredValue 更适合优化渲染，因为它与 React 自身深度集成，并且能够适应用户的设备。
与防抖或节流不同，useDeferredValue 不需要选择**任何固定延迟时间**。如果用户的**设备很快**（比如性能强劲的笔记本电脑），延迟的**重渲染几乎会立即发生**并且不会被察觉。如果用户的设备较慢，那么列表会相应地“滞后”于输入，滞后的程度与设备的速度有关。
此外，与防抖或节流不同，useDeferredValue 执行的延迟重新渲染**默认是可中断的**。这意味着，如果 React 正在重新渲染一个大型列表，但用户进行了另一次键盘输入，React 会放弃该重新渲染，先处理键盘输入，然后再次开始在后台渲染。相比之下，防抖和节流仍会产生不顺畅的体验，因为它们是阻塞的：它们仅仅是将渲染阻塞键盘输入的时刻推迟了。
如果你要优化的工作不是在渲染期间发生的，那么防抖和节流仍然非常有用。例如，它们可以让你减少网络请求的次数。你也可以同时使用这些技术。