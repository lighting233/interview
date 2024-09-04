## scheduler
scheduler​对于更新的方式上做出优化：
- 对于单个任务来说，会有节制地去执行，不会一直占用着线程去执行任务。而是执行一会，中断一下，再执行，一直重复。
- 而对于多个任务，它会先执行高优先级任务。
对于scheduler​的执行特性，可以看出来主要是对两种形式进行优化：**多个任务之间的管理**和**单个任务的执行控制**。
这也就引申出来scheduler​两种概念：**任务优先级**、**时间片** 。

### 时间片
时间片是指在单个任务在这一帧内最大的执行时间，超过这个时间后会立即被打断，不会一直占用线程，这样页面就不会因为任务连续执行的时间过长而产生视觉上的卡顿。

- 不同优先级都会对应的不同的任务过期时间间隔：
```js
ImmediatePriority --> IMMEDIATE_PRIORITY_TIMEOUT --> -1
UserBlockingPriority --> USER_BLOCKING_PRIORITY_TIMEOUT --> 250
NormalPriority --> NORMAL_PRIORITY_TIMEOUT --> 5000
LowPriority --> LOW_PRIORITY_TIMEOUT --> 10000
IdlePriority --> IDLE_PRIORITY_TIMEOUT --> maxSigned31BitInt
```
- 而过期时间的计算，则是任务开始时间加上优先级代表的时间间隔：
```js
var timeout;
switch (priorityLevel) {
case ImmediatePriority:
  timeout = IMMEDIATE_PRIORITY_TIMEOUT;
  break;
case UserBlockingPriority:
  timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
  break;
case IdlePriority:
  timeout = IDLE_PRIORITY_TIMEOUT;
  break;
case LowPriority:
  timeout = LOW_PRIORITY_TIMEOUT;
  break;
case NormalPriority:
default:
  timeout = NORMAL_PRIORITY_TIMEOUT;
  break;
}

// startTime看作任务开始时间
var expirationTime = startTime + timeout;
```

- 当调度对象被确定后，会把任务分成了两种：**未过期**的和**已过期**的。分别用两个队列存储，前者存到**timerQueue**​中，后者存到**taskQueue**​中。
  1. `timerQueue​`队列按照`startTime​`开始时间排序，开始时间越小越靠前。因为开始时间越早，说明会越早开始。任务进来的时候，开始时间默认是当前时间，如果进入调度的时候传了延迟时间，开始时间则是当前时间与延迟时间的和。
  2. `taskQueue​`队列按照`expirationTime​`过期时间排序。过期时间越早，说明越紧急，过期时间小的排在前面。
- 如果任务被放到了`taskQueue​`队列，那么立即调度一个函数去循环`taskQueue​`，挨个执行里面的任务。
- 如果任务被放到了`timerQueue​`队列，那么说明它里面的任务都不会立即执行。等待排在第一位的任务间隔时间到了之后，将第一个任务加入到`taskQueue​`队列中。然后重复执行这个动作，直到`timerQueue`​队列中的任务被清空。

```js {.line-numbers}
function unstable_scheduleCallback(priorityLevel, callback, options) {
  // 获取当前时间
  var currentTime = getCurrentTime();
  // 任务开始时间
  var startTime;
  if (typeof options === 'object' && options !== null) {
	// 判断用户是否传入了自定义的延迟时间
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      // 如果有延迟时间，那么任务开始时间就是当前时间加上延迟时间
      startTime = currentTime + delay;
    } else {
      // 没有延迟时间，任务开始时间就是当前时间
	  // 说明该任务需要立刻开始
      startTime = currentTime;
    }
  } else {
    startTime = currentTime;
  }

  // 计算间隔时间
  var timeout;
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT; // -1
      break;
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT; // 250
      break;
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT; // 1073741823
      break;
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT; // 10000
      break;
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT; // 5000
      break;
  }
  // 计算任务的过期时间，任务开始时间 + timeout
  // 若是立即执行的优先级（ImmediatePriority）过期时间是startTime - 1，意味着立刻就过期
  var expirationTime = startTime + timeout;

  // 创建调度任务
  var newTask = {
    id: taskIdCounter++,
    // 真正的任务函数
    callback,
    // 任务优先级
    priorityLevel,
    // 任务开始的时间，表示任务何时才能执行
    startTime,
    // 任务的过期时间
    expirationTime,
    // 在小顶堆队列中排序的依据
    sortIndex: -1,
  };

  // 如果任务已过期，则将 newTask 放入taskQueue，调用requestHostCallback函数
  // 开始调度执行taskQueue中的任务
  if (startTime > currentTime) {
    // 任务未过期，以开始时间作为timerQueue排序的依据
    newTask.sortIndex = startTime;
	// 加入timerQueue队列
    push(timerQueue, newTask);
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // 如果现在taskQueue中没有任务，并且当前的任务是timerQueue中排名最靠前的那一个
      // 那么需要检查timerQueue中有没有需要放到taskQueue中的任务
      if (isHostTimeoutScheduled) {
        // 因为即将调度一个requestHostTimeout，所以如果之前已经调度了，那么取消掉
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      }
      // 调用requestHostTimeout实现任务的转移，开启调度
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    // 任务已经过期，以过期时间作为taskQueue排序的依据
    newTask.sortIndex = expirationTime;
	// 加入taskQueue队列
    push(taskQueue, newTask);

    // 开始执行任务，使用flushWork去执行taskQueue
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}


function requestHostCallback(callback) {
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    schedulePerformWorkUntilDeadline();
  }
}

if (typeof MessageChannel !== 'undefined') {
  // DOM and Worker environments.
  // We prefer MessageChannel because of the 4ms setTimeout clamping.
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = () => {
    port.postMessage(null);
  };
}

// 记录开始时间
let startTime = -1;

const performWorkUntilDeadline = () => {
  if (isMessageLoopRunning) {
    const currentTime = getCurrentTime();
	// 注意此时将任务开始时的当前时间记录下来
	// 后面切分时间片使用
    startTime = currentTime;

    let hasMoreWork = true;
    try {
      hasMoreWork = flushWork(currentTime);
    } finally {
      if (hasMoreWork) {
		// 如果还有任务，继续让调度者调度执行者
        schedulePerformWorkUntilDeadline();
      } else {
        isMessageLoopRunning = false;
      }
    }
  }
};

function flushWork(initialTime: number) {
  // ...省略
  return workLoop(initialTime);
}


function workLoop(initialTime) {
  let currentTime = initialTime;
  advanceTimers(currentTime);
  currentTask = peek(taskQueue);
  while (
    currentTask !== null
  ) {
	// 中断任务条件
    if (currentTask.expirationTime > currentTime && shouldYieldToHost()) {
      break;
    }

    const callback = currentTask.callback;
    if (typeof callback === 'function') {
      currentTask.callback = null;
      // 任务的优先级
      currentPriorityLevel = currentTask.priorityLevel;
	  // 任务是否过期
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
 	  // 执行任务
	  // 获取返回值
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();
	  // 如果任务只是被中断了，返回值为一个函数，任务函数自身
      if (typeof continuationCallback === 'function') {
 		// 检查callback的执行结果返回的是不是函数，如果返回的是函数，则将这个函数作为当前任务新的回调。
        currentTask.callback = continuationCallback;
        return true;
      } else {
		// 如果返回值不是函数，说明任务已经彻底执行完毕
        if (currentTask === peek(taskQueue)) {
		  // 在taskQueue队列中弹出当前任务
          pop(taskQueue);
        }
      }
	  // 查找timerQueue队列中是否有可以开始执行的任务
	  advanceTimers(currentTime);
    } else {
      pop(taskQueue);
    }
    currentTask = peek(taskQueue);
  }
  // 返回当前任务是否被执行完的标记
  // 如果执行完 （else逻辑）则需要去timerQueue中查看是否有需要加入到taskQueue的任务
  if (currentTask !== null) {
    return true;
  } else {
    const firstTimer = peek(timerQueue);
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
    return false;
  }
}


export const frameYieldMs = 5;
let frameInterval = frameYieldMs;

function shouldYieldToHost(): boolean {
  // 计算时间间隔
  const timeElapsed = getCurrentTime() - startTime;
  // 间隔时间大于5毫秒，中断执行
  if (timeElapsed < frameInterval) {
    return false;
  }
  return true
}

```
所以，workLoop是通过判断任务函数的返回值去识别任务的完成状态的。
开始调度后，调度者调度执行者去执行任务，实际上是执行任务上的`callback`​（也就是任务函数）。如果执行者判断`callback​`返回值为一个`function`​，说明任务并没有完成，只是暂时被中断。
那么会将返回的这个function​再次赋值给任务的callback​，由于任务还未完成，所以并不会被弹出出`taskQueue​`队列，`currentTask`​获取到的还是这个任务，`while`​循环到下一次还是会继续执行这个任务，直到任务完成弹出队列，才会继续调度下一个任务。

所以取消任务直接将callback​属性赋值为null​就可以了。
```js
function unstable_cancelCallback(task) {
  // ...省略
  task.callback = null;
}
```

### 优先级
优先级是指在有多个任务待执行时，按照优先级的顺序依次执行，这样可以使一些紧急任务先被执行。

### task

```js
  const newTask = {
    id: 0,
    // 任务函数
    callback,
    // 任务优先级
    priorityLevel,
    // 开始时间
    startTime,
    // 过期时间
    expirationTime,
    // 在队列中排序的依据
    sortIndex: -1,
  };

```