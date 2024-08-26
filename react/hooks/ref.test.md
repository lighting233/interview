## Ref

### 使用
```jsx {.line-numbers}

//{current:T}

```

### 标记ref


### 执行ref的时机
1. 对于正常的绑定操作：

2. 对于组件卸载：


```jsx {.line-numbers}

```

### 源码

```jsx {.line-numbers}
function mountRef(innitialVal) {
	const hook = mountWorkInProcessFiber();
	hook.memorizeState = {current:innitialVal};
	return hook.memorizeState
}
```