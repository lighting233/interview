## Ref

### 使用
```jsx {.line-numbers}
<div ref={(dom) => console.log(dom)}></div>
//{current:T}
<div ref={domRef}></div>
```

### 标记ref
- mount 时：存在 ref
- update 时 ref 引用存在变化  

### 执行ref的时机
1. 对于正常的绑定操作：
    a. 解绑之前的ref（mutation阶段）
    b. 绑定新的ref（layout阶段）
    以`Child`为例，首次渲染时在`mutation`阶段,执行`ref(null);`,在`layout`阶段,执行`ref(instance)`，因为他的 fiber 上有Ref 的 `flag`
2. 对于组件卸载：
    a. 解綁之前的ref

```jsx {.line-numbers}
function App() {
	const [isDel, del] = useState(false);
	const divRef = useRef(null);

	console.warn('render divRef', divRef.current);

	useEffect(() => {
		console.warn('useEffect divRef', divRef.current);
	}, []);

	return (
		<div ref={divRef} onClick={() => del(true)}>
			{isDel ? null : <Child />}
		</div>
	);
}

function Child() {
	return <p ref={(dom) => console.warn('dom is:', dom)}>Child</p>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
```

### 源码

```jsx {.line-numbers}
function mountRef<T>(initialValue: T): { current: T } {
	const hook = mountWorkInProgressHook();
	const ref = { current: initialValue };
	hook.memoizedState = ref;
	return ref;
}

function updateRef<T>(initialValue: T): { current: T } {
	const hook = updateWorkInProgressHook();
	return hook.memoizedState;
}
```

```ts {.line-numbers}
//commitwork
function safelyDetachRef(current: FiberNode) {
	const ref = current.ref;
	if (ref !== null) {
		if (typeof ref === 'function') {
			ref(null);
		} else {
			ref.current = null;
		}
	}
}

const commitLayoutEffectsOnFiber = (
	finishedWork: FiberNode,
	root: FiberRootNode
) => {
	const { flags, tag } = finishedWork;

	if ((flags & Ref) !== NoFlags && tag === HostComponent) {
		// 绑定新的ref
		safelyAttachRef(finishedWork);
		finishedWork.flags &= ~Ref;
	}
};

function safelyAttachRef(fiber: FiberNode) {
	const ref = fiber.ref;
	if (ref !== null) {
		const instance = fiber.stateNode;
		if (typeof ref === 'function') {
			ref(instance);
		} else {
			ref.current = instance;
		}
	}
}
```