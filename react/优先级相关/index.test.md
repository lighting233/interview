
## 批处理默认情况下在微任务中处理，开启并发更新批处理在宏任务中执行

   
## lane模型

其中：


消费：



## schedule调度阶段

### 同步调度
- `curPriority === SyncLane`时在微任务调度同步任务

### `syncQueue=[performSyncWorkOnRoot,performSyncWorkOnRoot,performSyncWorkOnRoot]`只执行第一个，后边的执行后都会返回


### 多个微任务执行问题

## commit阶段移除消费的lane

## 优先级从何而来？
- 不同交互产生不同优先级
```ts

```
- `runWithPriority`接收`eventTypeToEventPriority`返回的 lane 和一个回调函数，复制给全局变量`currentPriorityLevel`，使用`unstable_getCurrentPriorityLevel`可以拿到
- 进一步还能推广到任何可以触发更新的上下文环境，比如 useEffect 回调中触发更新的优先级，首屏渲染优先级等。

### 如何把 lanes 的优先级转化为 schduler 的五种优先级
获取当前最高优先级，这个优先级和几个特定值比较大小，返回四种优先级，再和四种优先级匹配，默认的 default 是 normal 级别
  1. 
  2. 
  3. 
  4. 
  5. 

```ts
// 将lane优先级 转化为 Schedule 优先级

```