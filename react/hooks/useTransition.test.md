## useTransition

### react18


### useTransition的作用


### 使用方法

```ts
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
```

### 实现

```ts {.line-numbers} {
function mountTransition() {
	const [isPending,setPending] = mountState(false);
	const hook = mountWorkInProcessHook();
	const start = startTransition.bind(null,setPending);
	hook.memorizeState = start;
	return [isPending,start]
}

function updateTransition() {
	const [isPending,setPending] = updateState();
	const hook = updateWorkInProcessHook();
	
	return [isPending,hook.memorizeState]
}

function startTransition(setPending, callback) {
	setPending(true);
	//todo
	const prevTransition = currentBatchConfig.transition;
	currentBatchConfig.transition = 1;
	// const prevTransition = currentBatchConfig.transition;
	callback();
	setPending(false);
	currentBatchConfig.transition = prevTransition;
}

function mountTransition() {
    const  hook = mountWorkInProcessHook();
    const [isPending,setPending] = mountState(false);
    const start = startTransition.bind(null,setPending);
    //todo 
    // hook.memoizeState = [isPending,start]
    hook.memoizeState = start;
    return [isPending,start]
};

function updateTransition() {
    const hook = updateWorkInProcessHook();
    //todo
    const [isPending] = updateState();
    return [isPending,hook.memoizeState];
}

function startTransition(setPending,callback) {
    setPending(true);
    let prevTransition = currentBatchConfig.transition;
    currentBatchConfig.transition = 1;

    callback();
    setPending(false);
    currentBatchConfig.transition = prevTransition;

}
```