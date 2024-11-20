```ts
function mountReducer(
    reducer: (S, A) => S,
    initialArg: I,
    init?,
) {
    const hook = mountWorkInProgressHook();
    let initialState;
    if (init !== undefined) {
        initialState = init(initialArg);
    } else {
        initialState = initialArg;
    }
    hook.memoizedState = hook.baseState = initialState;
    const queue = {
        pending: null,
        lanes: NoLanes,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
    };
    hook.queue = queue;
    const dispatch: Dispatch<A> = (queue.dispatch = (dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber,
        queue,
    )));
    return [hook.memoizedState, dispatch];
}

function updateReducer(
    reducer: (S, A) => S,
    initialArg: I,
    init?,
) {
    const hook = updateWorkInProgressHook();
    const baseQueue = hook.queue;


    if (baseQueue !== null) {
        // We have a queue to process.
        const first = baseQueue.next;
        let newState = hook.baseState;

        let newBaseState = null;
        let update = first;
        const action = update.action;
        newState = reducer(newState, action);

        hook.memoizedState = newState;
        hook.baseState = newBaseState;
    }

    const dispatch = baseQueue.dispatch;
    return [hook.memoizedState, dispatch];
}
```

### **`useReducer` 的用法**

`useReducer` 是 React 提供的一个用于 **管理复杂状态逻辑** 的 Hook，特别适合状态变化涉及多个步骤或需要集中管理的场景。它是 Redux 的简化版。

---

### **基本语法**

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- **`reducer`**：一个纯函数 `(state, action) => newState`，根据当前状态和触发的动作返回新的状态。
- **`initialState`**：初始状态，可以是任何类型（对象、数组、数字等）。
- **`dispatch`**：一个函数，用于分发动作（`action`）来触发状态更新。

---

### **基础用法**

#### 示例：计数器

```javascript
import React, { useReducer } from 'react';

// 定义 reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unknown action type');
  }
};

const Counter = () => {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};

export default Counter;
```

#### **运行过程**
1. 初始状态为 `{ count: 0 }`。
2. 点击 `+` 时，触发 `dispatch({ type: 'increment' })`，状态更新为 `{ count: state.count + 1 }`。
3. 点击 `-` 时，触发 `dispatch({ type: 'decrement' })`，状态更新为 `{ count: state.count - 1 }`。
4. 点击 `Reset`，状态重置为初始值 `{ count: 0 }`。

---

### **适用场景**

1. **复杂状态逻辑**：
   - 当一个组件需要管理多个状态（如表单、多步操作）时，用 `useReducer` 可以清晰地定义状态转变规则。
2. **状态依赖**：
   - 新状态依赖于旧状态，用 `useReducer` 明确表达状态变化逻辑。
3. **与 Redux 类似的模式**：
   - 使用 `dispatch` 分发动作，集中管理状态。

---

### **高级用法**

#### **1. 带参数的初始状态**

可以通过第三个参数 `init` 函数懒初始化状态。

```javascript
const init = (initialValue) => ({ count: initialValue });

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, 5, init); // 初始值为 5
  return <p>Count: {state.count}</p>;
};
```

---

#### **2. 动作携带数据**

动作（`action`）可以包含额外的数据，用于动态更新状态。

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return { count: action.payload };
    default:
      throw new Error();
  }
};

// 分发时携带 payload
dispatch({ type: 'set', payload: 10 });
```

---

#### **3. 管理复杂状态（表单状态）**

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
};

const Form = () => {
  const initialState = { username: '', email: '' };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: 'change', field: e.target.name, value: e.target.value });
  };

  return (
    <form>
      <input
        name="username"
        value={state.username}
        onChange={handleChange}
      />
      <input name="email" value={state.email} onChange={handleChange} />
    </form>
  );
};
```

---

### **与 `useState` 的对比**

| 特性                 | `useState`                           | `useReducer`                          |
|----------------------|---------------------------------------|---------------------------------------|
| 使用场景            | 简单状态管理                          | 复杂状态逻辑                          |
| 状态更新            | 直接设置状态                          | 通过动作触发状态更新                  |
| 代码组织            | 状态逻辑分散                          | 状态逻辑集中                          |
| 可维护性            | 状态逻辑较难扩展                      | 状态逻辑易扩展                        |

---

### **总结**

- `useReducer` 是 `useState` 的增强版，适用于需要集中管理的复杂状态逻辑。
- 它清晰地定义了状态变化的规则，避免了复杂场景下状态管理代码的混乱。
- 通过配合动作（`action`）和 `dispatch`，可以灵活管理状态并支持动态更新。