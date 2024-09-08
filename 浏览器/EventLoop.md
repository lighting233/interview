# EventLoop

## 浏览器EventLoop
- 在最开始的时候，渲染主线程会进⼊⼀个⽆限循环
- 每⼀次循环会检查消息队列中是否有任务存在。如果有，就取出第⼀个任务执⾏，执⾏完⼀个后进⼊下⼀次循环；如果没有，则进⼊休眠状态。
- 其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列（`message queue`）的末尾。在添加新任务时，如果主线程是休眠状态，则会 将其唤醒以继续循环拿取任务
这样⼀来，就可以让每个任务有条不紊的、持续的进⾏下去了。 整个过程，被称之为事件循环`event loop`（消息循环`message loop` chrome这样叫）
- 如果浏览器有时间（渲染队列没有任务），事件循环从任务队列获取另一个任务，直到渲染队列接收到任务为止。

> 现代操作系统的调度器(schedulers)非常复杂。它们有优先级设置、执行队列等许多其他技术。这里做一个题外话，看到schedulers/优先级设置是不是想到React-Fiber架构了。其实，React在内部就是模仿操作系统，做了自己的实现逻辑。

### 如何理解 JS 的异步?
JS是一⻔单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。 而渲染主线程承担着诸多的工作，渲染⻚面、执行 JS 都在其中运行

### 异步任务

#### 1.页面渲染起始标识：
当垂直同步信号被排版线程接收到，新的屏幕渲染开始

#### 2.输入事件回调
而对于非连续性的事件，如keydown，keyup，mousedown，mouseup，touchstart，touchend等，会直接派发给主线程去执行。

#### 3.消息队列
1. postMessage、MessageChannel
2. I/O异步操作操作的回调：XHR、Fetch、WebSocket、Web Workers、IndexedDB。node 相关：FileReader、Stream
3. 计时完成需要执行的任务：setTimeout、setInterval
4. 事件回调：addEventListener。比如wheel，mousewheel，mousemove，pointermove，touchmove，出于优化的目的，浏览器会合并这些连续的事件，延迟到下一帧渲染是执行，也就是requestAnimationFrame之前。

#### 4.微任务队列
1. Promise.then、
2. MutationObserver、
3. queueMicrotask、
4. process.nextTick：Node独有

#### 5.requestAnimationFrame
这是一个用于屏幕视觉更新的理想的位置。因为，在此处能够获取到垂直同步事件最新的输入数据。其他类型的视觉更新，比如样式计算都比这个时间点滞后，所以该时间点是处理突变元素信息变更的最好时机。但是，人无完人，金无足赤。这个阶段是无法获取到任何计算后的样式信息(`el.style.backgroundImage`)或者布局属性(`el.style.offsetWidth`)的。

#### 6.渲染队列
- 强制布局（Forced Synchronous Layout 或 Forced Reflow）是Web性能优化领域的一个术语，它指的是浏览器在能够继续处理后续操作之前，必须完成当前的布局计算。
- 当强制执行布局时，浏览器会**暂停JS主线程**，尽管调用栈不是空的。
- 出发强制布局就会刷新渲染队列
![出发强制布局的 api](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2b00dfda40f432ea5a8e8fbef4ab281~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=813&h=812&s=90976&e=png&b=0e1216)
![事件环](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e2024e9521a4aafa779e6014c976b17~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=870&h=545&s=116493&e=png&b=fefefe)
#### 7.requestIdleCallback
如果在当前屏幕刷新过程中，主线程在处理完上述过程后还有剩余时间(<16.6ms)，此时主线程会主动触发requestIdleCallback。这是用于执行一些非必要的用户回调。

### 任务队列有优先级吗？
- 任务没有优先级，在消息队列中先进先出，但**消息队列**是有优先级的。
- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型 的任务可以分属于不同的队列。 在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。
- 浏览器必须准备好一个微队列，**微队列**中的任务优先所有其他任务执行
- 任务队列按照注册时的顺序取消息队列取任务执行
- 不是每种类型的任务都有一个单独的消息队列，而是根据不同的优先级区间加入不同的消息队列
