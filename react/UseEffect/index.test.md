## useEffect
- 当前 hook 的数据结构中的memorizeState存放 effect 数据结构，effect 的 next 直接指向下一个 effect

### 数据结构

```ts { .number-lines }

```
### 3种flag
1. 
2.  
3. 


```ts { .number-lines }
function mountEffect(create,deps) {
    const hook = mountWorkInProcessHook();
    //todo const nextDeps
    const nextDeps = deps === undefined ? null : deps;
    //todo |=
    currentlyRenderingFiber.flags |= PassiveEffect;
    //todo PassiveEffect | HookHasEffect
    hook.memorizeState = pushEffect(Passive | HookHasEffect,create,undefined,nextDeps)
}
function updateEffect(create,deps) {
    const hook = updateWorkInProcessHook();
    //todo const nextDeps
    const nextDeps = deps === undefined ? null : deps;
    let detroy;
    let prevEffect = currntHook.memorizeState;
    if(!prevEffect !== null) {
        detroy = prevEffect.destroy;
        if(nextDeps !== null) {
            if(isEqual(nextDeps,prevEffect.deps)) {
                hook.memorizeState = pushEffect(Passive,create,destory,nextDeps)
                return;
            }
            
        }
    }
    
    //todo |=
    currentlyRenderingFiber.flags |= PassiveEffect;
    //todo PassiveEffect | HookHasEffect
    hook.memorizeState = pushEffect(Passive | HookHasEffect,create,detroy,nextDeps)
}

```

### 工作流程
`FiberRootNode`上保存收集的回调
```ts

```

#### commit阶段调度

1. 首先调度回调
```ts {.line-numbers}
	
```

2. `commitMutationEffects(finishedWork, root);`中收集回调,`commitDeletion`收集 `unmount`, `commitPassiveEffect(unmountFiber, root, 'unmount');`;在`commitMutationEffectsOnFiber`中收集更新的回调

```ts
    
```

3. 执行副作用`flushPassiveEffects`
需要遍历两遍update，一遍收集 destroy 一遍收集 create
```ts

```