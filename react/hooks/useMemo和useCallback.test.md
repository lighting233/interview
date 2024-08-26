## useMemo

```jsx {.line-numbers}
function mountMemo<T>(nextCreate: () => T, deps: HookDeps | undefined) {
	const hook = mountWorkInProgressHook();
	const nextValue = nextCreate();
	const nextDeps = deps === undefined ? null : deps;
	hook.memorizeState = [nextValue,nextDeps];
	return nextValue;
}

function updateMemo<T>(nextCreate: () => T, deps: HookDeps | undefined) {
	const hook = updateWorkInProgressHook();
	const prevState = hook.memorizeState;
	const nextDeps = deps === undefined ? null : deps;
	if(nextDeps !== null) {
		if(isEqual(prevState[1],nextDeps)) {
			return prevState[0]
		}
	}
	const nextValue = nextCreate();
	return [nextValue,nextDeps]
}
```

## useCallback

```jsx {.line-numbers}
function mountCallback<T>(callback: T, deps: HookDeps | undefined) {
	const hook = mountWorkInProgressHook();
	const nextDeps = deps === undefined ? null : deps;
	hook.memorizeState = [callback,nextDeps];
	return callback;
}

function updateCallback<T>(callback: T, deps: HookDeps | undefined) {
	const hook = updateWorkInProgressHook();
	const prevState = hook.memorizeState;
	const nextDeps = deps === undefined ? null : deps;
	if(nextDeps !== null) {
		if(isEqual(prevState[1],nextDeps)) {
			return prevState[0]
		}
	}

	return [callback,nextDeps]
	
}
```