# vue3
## 对比vue2有哪些升级？
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
