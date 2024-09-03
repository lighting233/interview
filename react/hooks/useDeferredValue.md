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