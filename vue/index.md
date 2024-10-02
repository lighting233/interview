# vue3
Vue3 中使用 Proxy 来实现响应式数据变化。
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

- CompositionAPI 在用户编写复杂业务逻辑不会出现反复横跳问题
- CompositionAPI 不存在 this 指向不明确问题
- Composition API对 tree-shaking更加友好，代码也更容易压缩。
- CompositionAPI 提取公共逻辑非常方便
## 什么是vue的路由守卫?
Vue Router 的路由守卫是 Vue.js 应用程序中用于控制路由访问的功能。路由守卫可以在路由切换的不同阶段执行特定的逻辑，比如验证用户是否有权限访问某个路由、处理数据加载、记录页面访问等。它们可以帮助你在进入或离开路由时执行一些自定义逻辑。

### 路由守卫的类型

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