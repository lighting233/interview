# taro
[taro整体架构简析](https://blog.csdn.net/xiaomei_HT/article/details/139394735)
[taro2/3原理](https://www.bilibili.com/video/BV1s34y1B7bv/?spm_id_from=333.337.search-card.all.click&vd_source=78435c3cefd4783245d9d16d09d19859)

## taro2
Taro2是一个重编译时轻运行时的跨端框架
预编译部分代码减少启动时的编译时间，提升性能和用户体验 。
编译后代码与 React 无关：Taro 只是在开发时遵循了 React 的语法。
**编译时：**通过babel将类 React 组件转换成成小程序原生语法
**运行时：**主要处理生命周期、事件、setData等，运行时和React并没有关系
静态`template`转动态`JSX`相对简单，但是反过来却十分困难。这是因为JSX过于灵活，Taro2采用穷举的方式对JSX的可能写法进行一一适配，工作量大。
原来大量的 `AST` 语法操作将会改造成 `Webpack` 处理
### 存在的问题
1. 错误栈复杂，且无 `SourceMap`
2. 和 React DSL 强绑定
3. React 新特性需要手动对接
4. JSX 适配工作量大，限制多
5. 前端生态无法直接复用
6. 代码复杂，社区贡献困难

## taro3
Taro3是一个重运行时的跨端框架
Taro3的`taro-runtime`，自行实现了一套DOM/BOM的api
本质上是实现了一个`React`的自定义`Renderer`包，通过`taro-react`包来连接`react-reconciler`和`taro-runtime`

```js
new webpack.ProvidePlugin({
'document': ['@tarojs/runtime','document'],
'window': ['@tarojs/runtime', 'window']
});
```

### 具体实现方法
1. 实现`react-reconciler`的`hostConfig`配置，即在`hostConfig`的方法中调用对应的`Taro DOM/BOM API`
2. 实现 render 函数（类似于`ReactDOM.render` ）方法，可以看成是创建`Taro DOM Tree`的容器
3. 那经过上面的步骤，我们在小程序的运行时就可以生成 `Taro DOM tree`，现在的问题是如何将TaroDOM tree渲染到小程序视图层？
4. 首先将小程序的所有组件挨个进行模版化处理，从而得到小程序组件对应的`template`，然后基于`template`将 `Taro DOM tree` 进行递归渲染
5. Taro3核心的 `DOM/BOM API` 代码才1000行不到，而对比`jsdom`（在 Node.js 上实现的一套 Web标准的 DOM/BOM api）这个仓库的代码在压缩前大概有 2.1M，Taro3更佳轻量。
这对于Taro DOM Tree 的构建和更新 也是更加高效的。
6. 小程序的`page`页面通过`setData`更新视图层,需要先进行`diff`,`taro`更新的是`dom`级别的,因为要更新的已经是`diff`过的`dom`
### 优点:
1. **无DSL 限制**：无论是你们团队是 React 还是 Vue 技术栈，都能够使用Taro 开发新特性
2. **无缝支持**：由于 Taro Next 本质上是将 React/Vue 运行在小程序上，因此，各种新特性也就无缝支持了
3. 随着项目页面越来越多，原生的项目WXML体积会不断增加，而Taro3 不会。也就是说，当页面的数量超过一个临界点时，Taro3 的包体积可能会更小。这是因为Taro3的组件template是固定的，然后基于组件template去递归渲染。

### 缺点:
1. 和`Kbone/Remax`等运行时框架/库类似，性能上肯定是不及`Taro2/uni-app`的静态模版编译方案。
2. Taro3使用`template`进行递归渲染确实要比`kbone`使用自定义组件递归渲染节省很多渲染性能不过本身架构还是类似的，那就存在两个弊端：
   1. 初始渲染时需要使用`setData`传递全量的模板渲染描述数据，初始渲染性能较低；
   2. 视图更新时的性能完全取决于更新幅度，如果视图只是进行非常局部的更新那性能确实不会差，一旦出现大面积的视图更新，那setData的数据量也一定远高于静态模板的方式，这一点和初始渲染类似。|