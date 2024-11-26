# vue3
Vue3 中使用 Proxy 来实现响应式数据变化。
## **1.对比vue2有哪些升级？**
1. 【性能的提升】
    - 打包大小减少41%。
    - 初次渲染快 55%，更新渲染快 133%。
    - 内存减少54%。
2. 【源码的升级】
    - 使用Proxy代替defineProperty实现响应式。
    - 重写虚拟 DOM 的实现和 Tree-Shaking。
3. 【拥抱TypeScript】
    - Vue3 可以更好的支持 TypeScript。
4. 【新的特性】
   1. Composition API：Composition API 允许你将组件的逻辑拆分成可重用的函数，而不是混合、插槽等较为局限的方式。
   2. Teleport 和 Suspense
      1. Teleport: 允许你将组件渲染到 DOM 中的其他位置，而不受父子组件的限制。适用于弹窗、模态框等场景。
      2. Suspense: 支持异步组件的加载和数据获取，允许在异步内容加载时显示占位符（fallback）。
      3. Fragment 支持: Vue 3 支持在模板中使用多根元素（Fragment），不需要像 Vue 2 那样用一个根元素包裹所有模板内容。
   3. 全新的组件生命周期

- CompositionAPI 在用户编写复杂业务逻辑不会出现反复横跳问题
- CompositionAPI 不存在 this 指向不明确问题
- Composition API对 tree-shaking更加友好，代码也更容易压缩。
- CompositionAPI 提取公共逻辑非常方便
## 什么是vue的路由守卫?
Vue Router 的路由守卫是 Vue.js 应用程序中用于控制路由访问的功能。路由守卫可以在路由切换的不同阶段执行特定的逻辑，比如验证用户是否有权限访问某个路由、处理数据加载、记录页面访问等。它们可以帮助你在进入或离开路由时执行一些自定义逻辑。

-------

### **2.路由守卫的类型**

1. **全局守卫**: 适用于所有路由的守卫。
   - `beforeEach`: 在路由切换前执行。
   - `beforeResolve`: 在路由解析后、导航确认前执行。
   - `afterEach`: 在路由切换后执行。

   示例:
   ```javascript
   import Vue from 'vue';
   import Router from 'vue-router';

   Vue.use(Router);

   const router = new Router({
       routes: [
           // 定义路由
       ]
   });

   router.beforeEach((to, from, next) => {
       // 在路由切换前执行
       console.log('Navigating to:', to.path);
       next(); // 继续导航
   });
   ```

2. **路由独享守卫**: 针对特定路由的守卫。
   - `beforeEnter`: 在进入路由之前执行。

   示例:
   ```javascript
   const router = new Router({
       routes: [
           {
               path: '/protected',
               component: ProtectedComponent,
               beforeEnter: (to, from, next) => {
                   // 检查用户是否有权限访问
                   if (userIsAuthenticated) {
                       next(); // 继续导航
                   } else {
                       next('/login'); // 重定向到登录页面
                   }
               }
           }
       ]
   });
   ```

3. **组件内守卫**: 在路由组件内部定义的守卫。
   - `beforeRouteEnter`: 在路由进入之前执行。
   - `beforeRouteUpdate`: 在路由更新时执行。
   - `beforeRouteLeave`: 在路由离开之前执行。

   示例:
   ```javascript
   export default {
       beforeRouteEnter(to, from, next) {
           // 在进入路由之前执行
           next();
       },
       beforeRouteLeave(to, from, next) {
           // 在离开路由之前执行
           next();
       }
   };
   ```

### 使用场景

- **权限控制**: 确保用户在访问某些路由时拥有适当的权限。
- **数据预加载**: 在进入路由之前加载所需的数据。
- **记录导航**: 记录用户的导航行为以进行分析。
- **防止未保存的更改**: 在用户尝试离开页面时，提示他们保存更改。

### 总结

Vue Router 的路由守卫是一个强大的工具，可以帮助你在 Vue 应用程序中管理路由的访问和状态。通过使用路由守卫，你可以确保应用程序的安全性和用户体验。

-------

## **3.vue的:deep()是什么意思**
### **`:deep()` 在 Less 中的含义**

`:deep()` 是一种语法，用于处理组件库或框架（如 Vue 3）中的 **CSS 深层选择器** 问题，特别是当使用 Scoped CSS 时。

它不是 Less 的原生特性，而是框架（如 Vue 3）扩展的功能，用于实现深层次的样式穿透。Scoped CSS 的特点是样式仅对当前组件生效，`:deep()` 则用来突破这个限制，允许样式作用于子组件或嵌套内容。

---

### **使用场景**

在 Vue 或类似框架中，Scoped CSS 的作用范围通常限制在当前组件。例如：

```html
<template>
  <div class="parent">
    <ChildComponent />
  </div>
</template>

<style scoped>
.parent .child {
  color: red; /* 不会生效在 ChildComponent 中的内容 */
}
</style>
```

上述代码中，`.child` 样式不会生效在 `ChildComponent` 内，因为 `ChildComponent` 的 DOM 样式作用域独立。此时需要用 `:deep()` 实现样式穿透：

---

### **`:deep()` 的语法**

```html
<style scoped>
.parent :deep(.child) {
  color: red;
}
</style>
```

- **`:deep()` 的作用：**
  - 告诉编译器，此选择器应该作用于嵌套组件的内部结构，而不是限制在当前组件。
  - 在编译后，`:deep()` 会被解析为允许跨组件作用的选择器。

---

### **实际编译后的结果**

假设组件中使用了 Scoped CSS，编译后样式通常会带有一个独特的哈希标识符（如 `.parent[data-v-hash]`）。但 `:deep()` 会去掉对目标选择器的哈希限制，例如：

```css
/* 编译前 */
.parent :deep(.child) {
  color: red;
}

/* 编译后 */
.parent[data-v-hash] .child {
  color: red;
}
```

---

### **嵌套使用 `:deep()`**

当样式写在 Less 文件中时，`::deep()` 可与 Less 的嵌套语法结合：

```less
.parent {
  :deep(.child) {
    color: red;
  }
}
```

或者：

```less
:deep(.parent .child) {
  color: blue;
}
```

---

### **注意事项**

1. **Scoped CSS 环境：**
   - `:deep()` 通常在 Scoped CSS 场景下使用（如 Vue 3 的 `<style scoped>`）。
   - 如果样式不是 Scoped 的，`:deep()` 不起作用。

2. **不兼容纯 Less 项目：**
   - 如果项目中不涉及 Vue 或类似框架的 Scoped CSS，`:deep()` 不会被 Less 直接识别或解析。

3. **现代替代：**
   - 在 Vue 3 中，`::v-deep()` 是 `:deep()` 的推荐替代写法，用于兼容更规范的命名方式。

---

### **总结**

`:deep()` 是用于框架扩展场景下的一种选择器语法，用来突破 Scoped CSS 的样式限制。它通常用于 Vue 等框架，允许开发者直接为嵌套组件或深层 DOM 应用样式。

如果你不是在 Vue 或其他支持 Scoped CSS 的框架中使用，`Less` 不会原生支持 `:deep()`。

------------

## **4.reactive重新分配一个新对象，会失去响应式（可以使用Object.assign去整体替换）。是什么意思?**
在使用 Vue 的响应式系统（如 Vue 3 的 `reactive`）时，直接重新分配一个新的对象会导致响应式行为丢失。这是因为 Vue 的响应式系统依赖于对象的引用，而不是对象本身的内容。

---

### **背景知识**
`reactive` 是 Vue 3 提供的用于创建响应式对象的 API。它通过代理（Proxy）实现对对象属性的监听，确保数据的变化能够触发视图更新。

```javascript
import { reactive } from 'vue';

const state = reactive({ count: 0 });
```

在这个例子中，`state` 是一个代理对象。如果你修改 `state.count`，Vue 会自动检测到并更新相关的视图。

---

### **重新分配新对象的问题**

如果你直接为 `reactive` 的对象重新分配一个新对象，响应式会丢失：

```javascript
state = { count: 1 }; // 直接重新分配对象
```

#### **为什么响应式会丢失？**
- `reactive` 返回的是一个代理对象，而重新分配只是改变了变量的引用。
- 原代理对象仍然保持响应式，但新分配的对象是普通对象，不再受 Vue 的响应式系统监控。

---

### **解决方法**

#### **1. 使用 `Object.assign` 替换内容**
通过 `Object.assign`，可以将新对象的属性合并到原来的响应式对象中，而不会破坏响应式。

```javascript
Object.assign(state, { count: 1, otherProp: 'new' });
// 原来的 state 对象保持响应式，且内容已更新。
```

#### **2. 修改原有属性**
直接修改原有对象的属性，而不是重新赋值整个对象。

```javascript
state.count = 1; // 响应式更新生效
```

#### **3. 使用 `ref` 包裹对象**
如果你需要更换整个对象的引用，可以考虑使用 `ref`，因为它允许对值重新分配而保持响应式。

```javascript
import { ref } from 'vue';

const state = ref({ count: 0 });

// 替换整个对象
state.value = { count: 1 };
```

---

### **什么时候使用 `Object.assign`？**
`Object.assign` 是在需要整体更新对象的属性，但仍希望保留响应式的情况下非常有用。例如：

```javascript
function updateState(newState) {
  Object.assign(state, newState); // 合并新属性
}

updateState({ count: 10, message: 'Hello' });
```

---

### **总结**
- **直接重新分配新对象**：会失去响应式，因为它改变了引用，响应式系统监控的是原对象。
- **使用 `Object.assign`**：更新对象内容但保留引用，从而保持响应式。
- **使用 `ref` 包裹对象**：如果确实需要替换整个对象，`ref` 是更合适的选择。
---------------------

## **5.pinia提供的storeToRefs只会将数据做转换，而Vue的toRefs会转换store中数据。是什么意思?**
### **`storeToRefs` 和 `toRefs` 的区别**

在 Vue 和 Pinia 的生态中，`toRefs` 和 `storeToRefs` 都是用于将响应式对象的属性转换为单独的 **响应式引用（`ref`）**，但它们的工作机制和适用场景有所不同。

---

### **1. `toRefs`**

`toRefs` 是 Vue 提供的工具，用于将响应式对象的属性拆分为独立的 `ref`，使得这些属性可以单独被解构且保持响应式。

#### **行为**
- 对于普通的响应式对象（如通过 `reactive` 创建的对象），`toRefs` 会对其每个属性进行转换，使每个属性成为独立的 `ref`。
- 它直接操作传入的对象，因此可以作用于 Pinia 的 `state`。

#### **示例**

```javascript
import { reactive, toRefs } from 'vue';

const state = reactive({
  count: 0,
  name: '张三',
});

const refs = toRefs(state);

// 解构后，仍然保持响应式
console.log(refs.count.value); // 0
refs.count.value++; // 修改 refs.count，state.count 同步更新
console.log(state.count); // 1
```

#### **应用于 Pinia**

```javascript
import { defineStore } from 'pinia';
import { toRefs } from 'vue';

const useStore = defineStore('main', {
  state: () => ({
    count: 0,
    name: '张三',
  }),
});

const store = useStore();
const refs = toRefs(store.$state); // 对 state 进行转换
console.log(refs.count.value); // 0
refs.count.value++; // 同步更新 store.$state.count
```

---

### **2. `storeToRefs`**

`storeToRefs` 是 Pinia 提供的工具，专门用于将 Pinia `store` 中的 **`state` 和 `getters`** 的属性拆分为 `ref`，同时保持响应式。它不需要手动访问 `store.$state`。

#### **行为**
- 自动处理 Pinia `state` 和 `getters`。
- 不会转换 `store` 中的 `actions`（因为 `actions` 是方法，不需要响应式处理）。
- **不会修改 `store` 本身的数据结构**，仅对数据进行引用的转换。

#### **示例**

```javascript
import { defineStore, storeToRefs } from 'pinia';

const useStore = defineStore('main', {
  state: () => ({
    count: 0,
    name: '张三',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});

const store = useStore();
const { count, name, doubleCount } = storeToRefs(store);

// 解构后，仍然保持响应式
console.log(count.value); // 0
count.value++; // 修改 count，store.count 同步更新
console.log(store.count); // 1

console.log(doubleCount.value); // 2 （getter 也响应式）
```

---

### **区别对比**

| 特性                          | `toRefs`                               | `storeToRefs`                            |
|-------------------------------|----------------------------------------|------------------------------------------|
| **来源**                      | Vue                                    | Pinia                                   |
| **作用对象**                  | 普通响应式对象或 `store.$state`        | 整个 Pinia `store`                       |
| **处理范围**                  | 只处理对象的属性                      | 处理 `state` 和 `getters`（忽略 `actions`） |
| **是否需要操作 `$state`**     | 是                                     | 否                                       |
| **对原数据的影响**            | 转换 `state` 时，直接使用 `$state`     | 不修改 `store`，仅返回引用               |

---

### **总结**

#### **`storeToRefs`**
- **Pinia 专用工具**。
- 自动处理 `store` 的 `state` 和 `getters`，无需手动操作 `store.$state`。
- 更便捷，推荐在 Pinia 中使用。

#### **`toRefs`**
- **通用工具**，适用于所有响应式对象。
- 如果仅需要将 `store.$state` 的数据转换为 `ref`，可以使用 `toRefs`。
  
当处理 Pinia 的 `store` 时，`storeToRefs` 是更直接且语义明确的选择。

-------

## **6.Vue3-中模板编译优化**
1. 收集动态节点
   - 全量diff也是要从根节点向下递归遍历
   - 收集动态节点,静态节点不需要比对
   - **patchFlag**标记动态节点,用block收集
   - blockTree收集,父节点除了会收集动态节点之外，也会收集子block。更新时因key值不同会进行删除重新创建
2. 静态提升: 稳定的节点和不变的变量被提取出来,不用每次render生成
3. 预字符串化: 静态提升的节点都是静态的，我们可以将提升出来的节点字符串化。当连续静态节点超过20个时，会将静态节点序列化为字符串。
4. 开启函数缓存后，函数会被缓存起来，后续可以直接使用
-----------

## **7.Vue-项目中的错误如何处理的？**
1. 父组件（errorCaptured）-》子组件（errorCaptured）-》孙子组件出错时，错误会一直向上抛。如果`errorCaptured` 中返回 `false` 则会阻断传播。全局就拿不到了
2. 全局: app.config.errorHandler