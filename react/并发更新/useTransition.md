## useTransition

### react18
- react18 默认启用同步更新
- 使用并发特性后的那次更新启用的是并发更新

### useTransition的作用
- 执行过波效果时（假设从UI a过溲到UI b），通常处理远辑包括3个状态：

1. 初始情況是UIa
2. 开启过疲后，是示过渡中（比如loading）效果
3. 过波完成后切换到UI b

- 传统「过波中」效果的弊端：

1. 时间比较短时，「过演中效果」可能比较生硬，例如切换 tab，会有 loading 闪过
2. 「加毂过程阻塞Ul」也会带来不好的UX
useTransition就是为了解决这个问题，他的作用是：切换U时，先显示旧的UI，待新的UI加载完成后再显示新的UI.期间不会阻塞交互

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
触发三次更新，第一次触发后，如果没有其他高优先级的更新才会触发后两次更新
1. `setPending(true);`同步的优先级
2. `callback()`
3. `setPending(false);`和`callback()`在同一次优先级中更新 还原优先级为同步优先级
```ts {.line-numbers} {
function mountTransition() {
	const [isPending, setPending] = mountState(false);
	const hook = mountWorkInProgressHook();
	const start = startTransition.bind(null, setPending);
	hook.memoizedState = start;
	return [isPending, start];
}

function updateTransition() {
	const [isPending] = updateState();
	const hook = updateWorkInProgressHook();
	const start = hook.memoizedState;
	return [isPending as boolean, start];
}

function startTransition(setPending: Dispatch<boolean>, callback: () => void) {
	setPending(true);
	const prevTransition = currentBatchConfig.transition;
	currentBatchConfig.transition = 1;

	callback();
	setPending(false);

	currentBatchConfig.transition = prevTransition;
}
```
