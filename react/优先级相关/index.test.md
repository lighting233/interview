
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