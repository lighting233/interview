[useSyncExternalStore](https://juejin.cn/post/7250798439792541733)

```js{.line-numbers}
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

export default function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```

```js{.line-numbers}
let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
```

```js{.line-numbers}
// packages/react-reconciler/src/ReactFiberHooks.js

function mountSyncExternalStore<T>(
  // useSyncExternalStore 的第一个参数
  subscribe: (() => void) => () => void, 
  // useSyncExternalStore 的第二个参数，读取 store 中的数据快照
  getSnapshot: () => T,
  // useSyncExternalStore 的第三个参数，读取 store 中数据的初始快照
  getServerSnapshot?: () => T,
): T {
  const fiber = currentlyRenderingFiber;
  // 创建一个新的 hook 对象，并返回当前的 workInProgressHook 对象
  const hook = mountWorkInProgressHook();

  let nextSnapshot;
  const isHydrating = getIsHydrating();
  // 服务端渲染
  if (isHydrating) {
    
  } else {
    // 客户端渲染

    // 执行 getSnapshot 函数，读取store 中的数据快照
    nextSnapshot = getSnapshot();
  }

  // Read the current snapshot from the store on every render. This breaks the
  // normal rules of React, and only works because store updates are
  // always synchronous.
  hook.memoizedState = nextSnapshot; // 缓存从外部 store 读取的数据快照，每次渲染时会从存储中读取当前快照
  // 定义一个快照示例，存储到 hook 的队列上
  const inst = {
    value: nextSnapshot,
    getSnapshot,
  };
  hook.queue = inst;

  // 执行 effect，订阅外部的store
  // Schedule an effect to subscribe to the store.
  mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]);

  fiber.flags |= PassiveEffect;
  // 将一个 update 添加到 effect 链表
  pushEffect(
    HookHasEffect | HookPassive,
    updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot),
    createEffectInstance(),
    null,
  );
// 返回当前store的快照
  return nextSnapshot;
}



// 订阅外部 store 并返回一个取消订阅的函数
function subscribeToStore<T>(
  fiber: Fiber,
  inst: StoreInstance<T>,
  subscribe: (() => void) => () => void,
): any {
  // 使组件重新渲染
  const handleStoreChange = () => {
    // The store changed. Check if the snapshot changed since the last time we
    // read from the store.
    // 从外部 store 中读取的前后的数据快照不一致，强制组件重新渲染
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      // 强制组件重新渲染
      forceStoreRerender(fiber);
    }
  };
	// 订阅 store 并返回一个取消订阅的函数
  // Subscribe to the store and return a clean-up function.
  return subscribe(handleStoreChange);
}

// 比较当前读取的数据快照与上一次读取的数据快照是否一致
function checkIfSnapshotChanged<T>(inst: StoreInstance<T>): boolean {
  // 获取 useSyncExternalStore hook 传递进来的 getSnapshot 函数，该函数从外部 store 读取数据的快照
  const latestGetSnapshot = inst.getSnapshot;
  // 上一次读取的数据快照
  const prevValue = inst.value;
  try {
    // 执行 getSnapshot 函数，读取 store 的数据快照
    const nextValue = latestGetSnapshot();
    // 使用 Object.is 比较读取的数据快照是否相同，如果不相同，React 会重新渲染组件
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}


function forceStoreRerender(fiber: Fiber) {
  const root = enqueueConcurrentRenderForLane(fiber, SyncLane);
  if (root !== null) {
    // 进入任务调度流程
    scheduleUpdateOnFiber(root, fiber, SyncLane);
  }
}


```

`update`时比较`prevSnapshot`, `nextSnapshot`是为了不让`FunctionCompenent`进入`bailout`
```js
// 从 memoizedState 属性上获取上一次读取的数据快照
  const prevSnapshot = (currentHook || hook).memoizedState;
  // 使用 Object.is 浅比较前后读取的数据快照是否相同
  const snapshotChanged = !is(prevSnapshot, nextSnapshot);
  // 前后读取的数据快照不相同，更新 hook 对象上存储的数据快照
  if (snapshotChanged) {
    hook.memoizedState = nextSnapshot;
    markWorkInProgressReceivedUpdate();
  }
```