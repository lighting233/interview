
## 批处理默认情况下在微任务中处理，开启并发更新批处理在宏任务中执行
1. 需要实现一套优先级机制，每个更新都拥有优先级
2. 需要能够合并一个宏任务/微任务中能发的所有更新
3. 需要一套算法，用于决定哪个优先级优先进入render阶段
   
## lane模型
- lane（二进制位，代表优先级）
- lanes（二进制位，代表lane的集合）
其中：
- lane作为update的优先级
- lanes作为lane的集合

消费：
- 本次更新 lane
- lanes 集合，用来记录要消费的 lane，在 schdule 中选出 lane


## schedule调度阶段
- 在`dispatch` 中`const update = createUpdate(action,lane);enqueueUpdate(updateQueue, update);`并调度 `scheduleUpdateOnFiber(fiber, lane);`
- 每次在`ensureRootIsScheduled`中选出优先级最高的 lane`const curPriority = getHighestPriorityLane(updateLanes);`
### 同步调度
- `curPriority === SyncLane`时在微任务调度同步任务
```ts
scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLanes));
scheduleMicrotask(flushSyncCallbacks);
```
- 本次setState执行结束
- 再次执行setState，最终会在`syncQueue`加入多个任务，生成多个`queueMicrotask`
### `syncQueue=[performSyncWorkOnRoot,performSyncWorkOnRoot,performSyncWorkOnRoot]`只执行第一个，后边的执行后都会返回
- 主代码执行完后，会进入微任务阶段，执行`performSyncWorkOnRoot`，在代码开始判断
```ts
    if (nextLane !== SyncLane) {
		ensureRootIsScheduled(root);
		return;
	}
```
- 在 `renderRoot` 中 `workInProgressRootRenderLane = NoLane;`，所以下一轮`performSyncWorkOnRoot`直接 `return` 掉
- `functionComponent`执行中`updateState`中执行`processUpdateQueue`消费 `updatequeue`

### 多个微任务执行问题
- 第一组微任务执行完`syncQueue`已经清空了
```ts
export function flushSyncCallbacks() {
	if (!isFlushingSyncQueue && syncQueue) {
		isFlushingSyncQueue = true;
		try {
			syncQueue.forEach((callback) => callback());
			syncQueue = null;
		} catch (e) {
			console.error('TODO flushSyncCallbacks报错', e);
		} finally {
			isFlushingSyncQueue = false;
		}
	}
}
```
## commit阶段移除消费的lane