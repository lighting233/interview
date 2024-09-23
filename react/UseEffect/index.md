## useEffect
- 当前 hook 的数据结构中的memorizeState存放 effect 数据结构，effect 的 next 直接指向下一个 effect

### 数据结构

```ts { .number-lines }
    type EffectCallback = () => void;
    export type HookDeps = any[] | null;
    export interface Effect {
	    tag: Flags;
	    create: EffectCallback | void;
	    destroy: EffectCallback | void;
	    deps: HookDeps;
	    next: Effect | null;
     }
```
### 3种flag
1. 对于fiber，新增 PassiveEffect，代表「当前fiber本次更新存在副作用」
2. 对于effect hook, Passive代表「useEffect对应effect. 
3. 对于effect hook, HookHasEffect代表「当前effect本次更新存在副作用」


```ts { .number-lines }
    function mountEffect(create,deps) {
        const hook = mountWorkInProcessHook();
        const nextDeps = deps === undefined ? null : deps;
        currentlyRendingFiber.flags |= PassiveEffect;
		//mount时没有 destroy 函数
        hook.memosizeState = pushEffect(Passive | HookHasEffect, create, undefined, nextDeps)
    }

    function pushEffect(hookFlags,create,destroy,deps) {
        const effect = {
            tag: hookFlags,
            create,
            destroy,
            deps,
            next: null
        } 
        const fiber = currentlyRendingFiber;
        const upDateQueue = fiber.upDateQueue;

        if (updateQueue === null) {
		    const updateQueue = createFCUpdateQueue();
		    fiber.updateQueue = updateQueue;
		    effect.next = effect;
		    updateQueue.lastEffect = effect;
	    } else {
		// 插入effect
		    const lastEffect = updateQueue.lastEffect;
		    if (lastEffect === null) {
			    effect.next = effect;
			    updateQueue.lastEffect = effect;
		} else {
			const firstEffect = lastEffect.next;
			lastEffect.next = effect;
			effect.next = firstEffect;
			updateQueue.lastEffect = effect;
		}
	}
	return effect;
    }

function updateEffect(
	create,
	deps
) {
	const hook = updateWorkInProgressHook();
	const nextDeps = deps === undefined ? null : deps;
	let destroy;

	if (currentHook !== null) {
		const prevEffect = currentHook.memoizedState;
		destroy = prevEffect.destroy;
		if (nextDeps !== null) {
			// 浅比较依赖
			const prevDeps = prevEffect.deps;
			if (areHookInputsEqual(prevDeps, nextDeps)) {
				hook.memoizedState = pushEffect(Passive, create, destroy, nextDeps);
				return;
			}
		}
	}
	// 接下来才是有副作用
	(currentlyRenderingFiber as FiberNode).flags |= PassiveEffect;
	//update时有了destroy
	hook.memoizedState = pushEffect(
		Passive | HookHasEffect,
		create,
		destroy,
		nextDeps
	);
}

function areHookInputsEqual(nextDeps: TEffectDeps, prevDeps: TEffectDeps) {
	if (prevDeps === null || nextDeps === null) {
		return false;
	}
	if(prevDeps.length !== nextDeps.length) {
		return false;
	}
	for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
		if (Object.is(prevDeps[i], nextDeps[i])) {
			continue;
		}
		return false;
	}
	return true;
}
```

### 工作流程
`FiberRootNode`上保存收集的回调
```ts
        // 保存未执行的effect
		this.pendingPassiveEffects = {
			// 属于卸载组件的
			unmount: [],
			// 属于更新组件的
			update: []
		};
```
#### compeleteWork阶段
给 `fiber.flags` 合并上副作用标记之后，会在 `compeleteWork` 阶段将 flags 向上冒泡到 `HostRootFiber.subtreeFlags`

#### commit阶段调度
```ts {.line-numbers}
function commitRootImpl() {
    //rootWithPendingPassiveEffects不为null先执行一遍flushPassiveEffects
    do {
        flushPassiveEffects();
    } while (rootWithPendingPassiveEffects !== null);

    if (
        (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
        (finishedWork.flags & PassiveMask) !== NoFlags
    ) {
        if (!rootDoesHavePassiveEffects) {
            rootDoesHavePassiveEffects = true;
            pendingPassiveEffectsRemainingLanes = remainingLanes;

            pendingPassiveTransitions = transitions;
            scheduleCallback(NormalSchedulerPriority, () => {
                flushPassiveEffects();
                return null;
            });
        }
    }
}

function flushPassiveEffectsImpl() {
    const prevExecutionContext = executionContext;
    executionContext |= CommitContext;

    commitPassiveUnmountEffects(root.current);
    commitPassiveMountEffects(root, root.current, lanes, transitions);
    executionContext = prevExecutionContext;

    flushSyncCallbacks();
}

function commitPassiveUnmountEffects_begin() {
    while (nextEffect !== null) {
        const fiber = nextEffect;
        const child = fiber.child;

        //有ChildDeletion的先执行卸载的destroy函数
        if ((nextEffect.flags & ChildDeletion) !== NoFlags) {
            const deletions = fiber.deletions;
            if (deletions !== null) {
                for (let i = 0; i < deletions.length; i++) {
                    const fiberToDelete = deletions[i];
                    nextEffect = fiberToDelete;
                    commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                        fiberToDelete,
                        fiber,
                    );
                }
                nextEffect = fiber;
            }
        }

        //有PassiveMask说明有删除或者有标记effect,执行对应的destroy函数
        if ((fiber.subtreeFlags & PassiveMask) !== NoFlags && child !== null) {
            child.return = fiber;
            nextEffect = child;
        } else {
			//mountEffect时传入effect对象的destroy为null,所以在执行这个函数的时候里边不会执行destroy()
            commitPassiveUnmountEffects_complete();
        }
    }
}
```
1. 首先调度回调
```ts {.line-numbers}
	if (
		(finishedWork.flags & PassiveMask) !== NoFlags ||
		(finishedWork.subtreeFlags & PassiveMask) !== NoFlags
	) {
		if (!rootDoesHasPassiveEffects) {
			rootDoesHasPassiveEffects = true;
			// 调度副作用
			scheduleCallback(NormalPriority, () => {
				// 执行副作用
				flushPassiveEffects(root.pendingPassiveEffects);
				return;
			});
		}
	}
```

2. `commitMutationEffects(finishedWork, root);`中收集回调,`commitDeletion`收集 `unmount`, `commitPassiveEffect(unmountFiber, root, 'unmount');`;在`commitMutationEffectsOnFiber`中收集更新的回调

```ts
    if ((flags & PassiveEffect) !== NoFlags) {
		// 收集因deps变化而需要执行的useEffect
		commitPassiveEffect(finishedWork, root, 'update');
		finishedWork.flags &= ~PassiveEffect;
	}
```

3. ~~执行副作用`flushPassiveEffects`~~
需要遍历两遍update，一遍收集 destroy 一遍收集 create
```ts
function flushPassiveEffects(pendingPassiveEffects: PendingPassiveEffects) {
	let didFlushPassiveEffect = false;
	pendingPassiveEffects.unmount.forEach((effect) => {
		didFlushPassiveEffect = true;
		commitHookEffectListUnmount(Passive, effect);
	});
	pendingPassiveEffects.unmount = [];

	pendingPassiveEffects.update.forEach((effect) => {
		didFlushPassiveEffect = true;
		commitHookEffectListDestroy(Passive | HookHasEffect, effect);
	});
	pendingPassiveEffects.update.forEach((effect) => {
		didFlushPassiveEffect = true;
		commitHookEffectListCreate(Passive | HookHasEffect, effect);
	});
	pendingPassiveEffects.update = [];
	flushSyncCallbacks();
	return didFlushPassiveEffect;
}
```

## useLayoutEffect
- `useLayoutEffect` 在 `Mutation` 这个阶段，执行我们删除节点和更新节点的销毁逻辑，也就是 `destroy` 函数，在 `Layout` 这个阶段，执行我们节点的副作用函数 `create` 逻辑并且挂载我们的 destroy 函数.
- 我们发现`useLayoutEffect`的`create`函数在`layout`阶段同步执行，我们已经知道`commitRootImpl`最后阶段会执行`flushSyncCallbacks`检测并执行同步任务，而`useLayoutEffect`中触发的调度任务（setState）将是同步的优先级， 因此如果我们在`useLayouteffect`中`setState`将会直接重新发起`render`的流程而不是异步执行，即`useLayoutEffect`的`create`函数中触发的任何动作都会在本轮事件循环中同步执行。
