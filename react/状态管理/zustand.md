# zustand

## 优势

### Zustand 主要旨在解决以下问题：
1. 简化状态管理：提供一个更直观的 API，通过避免 Redux 那样的冗余样板代码，使得状态管理更加简洁和直接。Redux 开发必须创建 reducer、action、dispatch来处理状态, Zustand 让它变得更加容易。
2. 更好的开发体验：通过使用 React Hooks，Zustand 使得在函数组件中访问和更新状态变得容易。
3. 无拘无束：Zustand 允许创建多个独立的 store，不强制要求"单一真相来源"，给予开发者更多的灵活性。
4. 性能优化：Zustand 允许组件仅订阅状态的一部分，从而减少不必要的渲染和提高性能。
5. 简单的状态共享：不需要复杂的上下文或提供者，状态可以跨组件和文件轻松共享。
6. 中间件和增强功能：支持中间件，使得开发者可以轻松添加日志记录、持久化存储等增强功能。
7. 适应现代 React 功能：考虑到了 React 的新特性，如 Concurrent Mode 和 Suspense，从而确保在现代 React 特性下的稳定性。
8. Zustand 的整个代码库非常小巧，gzip 压缩后仅有 1KB，对项目性能影响极小。
9. Zustand 可以轻松地与其他 React 库（如 Redux、MobX 等）共存，方便逐步迁移项目状态管理。
[Zustand 解决了 Redux 的哪些问题](https://juejin.cn/post/7399985328708878362?searchId=2024091814525748783D59F0CAFE4C3159)
[jotai and zustand](https://juejin.cn/post/7356813407373328418?searchId=2024091814525748783D59F0CAFE4C3159)
[Zustand 状态库：轻便、简洁、强大的 React 状态管理工具](https://juejin.cn/post/7321049446443384870)

### 重新渲染？
Zustand 库使用了选择器 (selectors) 函数和引用相等性 (reference equality) 检查来帮助避免无效渲染。当你在组件中使用 Zustand 的 useStore 钩子时，你可以提供一个选择器函数来订阅特定的状态片段。Zustand 会使用严格相等性检查 (===) 来比较选择器返回的状态片段是否真的发生了变化，如果状态片段的值没有变化，组件不会重新渲染。
```js
const bears = useStore((state) => state.bears);
```
在这个例子中，组件只订阅 bears 状态片段，如果 bears 值没有变化，即使其他状态改变，组件也不会重新渲染。
对于更复杂的状态选择，可能需要构造一个包含多个状态片段的对象，这时可以使用 shallow 比较来防止无效渲染：
```js
import { useShallow } from "zustand/shallow";

const { nuts, honey } = useStore(
  (state) => ({
    nuts: state.nuts,
    honey: state.honey,
  }),
  useShallow,
);
```
**总结一下**，Zustand 通过以下方式来避免无效渲染：
1. 选择器：通过允许你订阅特定的状态片段，仅当这些片段发生变化时才触发组件的重新渲染。
2. 引用相等性检查：默认情况下，选择器返回的状态片段会通过严格相等性检查来决定是否需要重新渲染。
3. 浅层比较：使用 useShallow 或其他浅层比较函数来对选择器返回的对象进行浅层属性比较，从而进一步减少不必要的渲染。



### 手写
```js {.line-numbers}
import { useSyncExternalStore } from "react";

export const create = (createState) => {
    const api = createStore(createState)

    const useBoundStore = (selector) => useStore(api, selector)

    Object.assign(useBoundStore, api);

    return useBoundStore
}

const createStore = (createState) => {
    let state;
    const listeners = new Set();
    // 更新
    const setState = (partial, replace) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial

      if (!Object.is(nextState, state)) {
        const previousState = state;

        if(!replace) {
            state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
        } else {
            state = nextState;
        }
        listeners.forEach((listener) => listener(state, previousState));
      }
    }
  
    const getState = () => state;
  
    const subscribe= (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  
    const destroy= () => {
      listeners.clear()
    }
  
    const api = { setState, getState, subscribe, destroy }
    // 初始化
    state = createState(setState, getState, api)

    return api
}

function useStore(api, selector) {

    function getState() {
        return selector(api.getState());
    }
  
    return useSyncExternalStore(api.subscribe, getState)
}
```

```js
// 计数器 Demo 快速上手
import React from "react";
import { create } from "zustand";
​
// create（）：存在三个参数，第一个参数为函数，第二个参数为布尔值
// 第一个参数：(set、get、api)=>{…}
// 第二个参数：true/false 
// 若第二个参数不传或者传false时，则调用修改状态的方法后得到的新状态将会和create方法原来的返回值进行融合；
// 若第二个参数传true时，则调用修改状态的方法后得到的新状态将会直接覆盖create方法原来的返回值。
​
const useStore = create(set => ({
  count: 0,
  setCount: (num: number) => set({ count: num }),
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
​
export default function Demo() {
  // 在这里引入所需状态
  const { count, setCount, inc } = useStore();
​
  return (
    <div>
      {count}
      <input
        onChange={(event) => {
          setCount(Number(event.target.value));
        }}
      ></input>
      <button onClick={inc}>增加</button>
    </div>
  );
}
```
