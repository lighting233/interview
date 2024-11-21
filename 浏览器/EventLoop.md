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
[出发强制布局的 api](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2b00dfda40f432ea5a8e8fbef4ab281~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=813&h=812&s=90976&e=png&b=0e1216)
[事件环](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e2024e9521a4aafa779e6014c976b17~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=870&h=545&s=116493&e=png&b=fefefe)
#### 7.requestIdleCallback
如果在当前屏幕刷新过程中，主线程在处理完上述过程后还有剩余时间(<16.6ms)，此时主线程会主动触发requestIdleCallback。这是用于执行一些非必要的用户回调。

### 任务队列有优先级吗？
- 任务没有优先级，在消息队列中先进先出，但**消息队列**是有优先级的。
- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型 的任务可以分属于不同的队列。 在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。
- 浏览器必须准备好一个微队列，**微队列**中的任务优先所有其他任务执行
- 任务队列按照注册时的顺序取消息队列取任务执行
- 不是每种类型的任务都有一个单独的消息队列，而是根据不同的优先级区间加入不同的消息队列


## **postMessage 和 MessageChannel的区别**
### 1. **`postMessage`**:
`postMessage` 是一种用于不同浏览器上下文之间通信的简单、直接的方式。例如，你可以使用 `postMessage` 来让一个 `iframe` 和其父页面进行通信，或者让两个不同的窗口进行通信。

#### 特点：
- **上下文范围**：`postMessage` 可以在不同的浏览器上下文之间传递数据，如：
  - 主页面和 `iframe` 之间。
  - 父窗口和子窗口之间（通过 `window.open()` 打开的）。
  - 主页面和 `Web Workers` 之间。

- **跨域通信**：`postMessage` 允许跨域通信（例如，一个页面可以通过 `postMessage` 向不同域的 `iframe` 发送消息），但消息的接收方可以通过验证消息的来源和数据来确保安全性。

- **单向通信**：`postMessage` 是一次性的，发消息的一方需要等待接收方处理消息并可能再通过另一个 `postMessage` 回复。

#### 使用示例：
```javascript
// 父页面向 iframe 发送消息
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage('Hello from parent', 'https://example.com');

// 在 iframe 中监听消息
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://example.com') return;  // 安全检查
  console.log(event.data);  // 'Hello from parent'
});
```

### 2. **`MessageChannel`**:
`MessageChannel` 提供了一种双向、全双工通信的方式，可以创建两个端点（`port1` 和 `port2`）来进行消息传递。它通常用于在相同的上下文中创建独立的通信通道，比如主页面和 `Web Worker` 之间的双向通信。

#### 特点：
- **双向通信**：`MessageChannel` 提供了两个端点 `port1` 和 `port2`，双方可以互相发送和接收消息，实现双向通信。
- **适用于更复杂的通信**：相比 `postMessage`，`MessageChannel` 更适合用于复杂的通信场景，比如同时进行多条消息的传递，不用每次等待回复。
- **独立通道**：`MessageChannel` 的通信通道是独立的，不受全局事件的干扰，可以更容易管理和维护消息流。

#### 使用示例：
```javascript
// 创建 MessageChannel
const channel = new MessageChannel();

// 通过 port1 发送消息
channel.port1.postMessage('Message from port1');

// 监听 port2 的消息
channel.port2.onmessage = (event) => {
  console.log(event.data);  // 'Message from port1'
};

// 发送消息给 Web Worker 或 iframe
worker.postMessage('Init communication', [channel.port2]);
```

### 区别总结：

| 特性                          | `postMessage`                                      | `MessageChannel`                                 |
|-------------------------------|----------------------------------------------------|-------------------------------------------------|
| **通信模型**                  | 单向，简单的消息传递                               | 双向，全双工通信                                |
| **适用范围**                  | 不同浏览器上下文（窗口、iframe、Web Worker）之间通信 | 相同上下文（主页面与 Worker）之间通信           |
| **跨域支持**                  | 支持跨域通信                                       | 不适用于跨域，但可用于跨线程通信                |
| **消息通道管理**              | 无法管理多个独立的消息流                           | 提供独立的通信通道，通过 `port1` 和 `port2` 传递 |
| **常见用例**                  | 跨域窗口通信、`iframe` 与主页面通信、Worker通信     | 更复杂的 Web Worker 通信，或内部的双向通信场景   |

- **`postMessage`** 更适用于简单的跨窗口或跨域通信。
- **`MessageChannel`** 适用于需要复杂双向通信的情况，比如 Web Workers 或同一上下文内的组件通信。

### `worker.postMessage({ port: channel.port2 }, [channel.port2]);`这句中postMessage的参数是什么意思?
`worker.postMessage({ port: channel.port2 }, [channel.port2]);` 是用于向 Web Worker 发送消息的一种高级用法，它不仅传递数据，还将 `MessagePort` 对象作为 "传输对象" 发送到 Worker。

---

### **`postMessage` 方法的参数详解**

`postMessage` 的完整签名：
```javascript
postMessage(message, transferList)
```

#### **1. `message` 参数**
- **类型：** 任意类型的 JavaScript 数据。
- **作用：** 这是传递给 Worker 的数据，可以是简单值（如字符串、数字）或复杂的对象。

在示例中：
```javascript
{ port: channel.port2 }
```
表示一个包含 `port2` 的对象，它将被传递到 Worker 中，Worker 可以通过事件处理程序接收。

---

#### **2. `transferList` 参数**
- **类型：** 可选数组。
- **作用：** 指定需要“转移”的对象列表。传输的对象将从发送方“移交”到接收方，避免复制开销。

   - **传输 vs 复制：**
     - **复制：** 默认情况下，`postMessage` 会复制传递的数据。
     - **传输：** 如果在 `transferList` 中包含可转移对象（如 `ArrayBuffer` 或 `MessagePort`），这些对象的所有权会被“转移”到接收方，不再保留在发送方。
   - 传输的优点是性能高，但被转移的对象在发送方将变为不可用。

在示例中：
```javascript
[channel.port2]
```
表示将 `channel.port2`（即 `MessagePort`）的所有权转移给 Worker。

---

### **为何使用 `transferList` 传递 `MessagePort`**

- `MessagePort` 是 `MessageChannel` 的一个端点，它本质上是一种独立的通信通道。
- 如果不通过 `transferList` 转移 `MessagePort`，主线程和 Worker 都会尝试使用该端口，导致错误。
- 转移后：
  - **主线程：** 不能再使用 `channel.port2`。
  - **Worker：** 成为 `channel.port2` 的唯一拥有者，可以自由使用它。

---

### **完整数据传输流程**

#### **主线程代码**
```javascript
const worker = new Worker('worker.js');
const channel = new MessageChannel();

// 将 port2 发送到 Worker，并转移所有权
worker.postMessage({ port: channel.port2 }, [channel.port2]);

// 使用 port1 在主线程中通信
channel.port1.onmessage = (event) => {
  console.log('Message from Worker:', event.data);
};

// 向 Worker 发送初始消息
channel.port1.postMessage('Hello from Main Thread');
```

#### **Worker 文件 (`worker.js`)**
```javascript
onmessage = (event) => {
  const port = event.data.port; // 接收转移的 port2

  // 监听 port 的消息
  port.onmessage = (event) => {
    console.log('Message from Main Thread:', event.data);

    // 回复主线程
    port.postMessage('Hello from Worker');
  };
};
```

---

### **关键点总结**
1. **`message` 是消息内容：** 可以是任意 JavaScript 数据类型。
2. **`transferList` 是转移对象的列表：**
   - 可转移对象包括 `MessagePort`、`ArrayBuffer`、`ImageBitmap` 等。
   - 转移后，发送方无法再使用这些对象。
3. **优化性能：** 使用 `transferList` 可以避免数据复制，提高性能，尤其是大对象或实时通信场景。

通过 `MessageChannel` 和 `postMessage` 的结合，可以实现高效的双向通信，同时保持线程间的数据独立性和性能优势。