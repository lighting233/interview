1、导出相应的生命周期钩子

微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。

<!--注意 ‘microRoot’ 是微应用首页index.html文件渲染根节点的id,root是主应用节点id.-->



```
// 入口文件

/**
* bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
* 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
*/
export async function bootstrap() {
     console.log('react app bootstraped');
}
/**
* 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
*/
export async function mount(props) {
     ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('microRoot'));
}
/**
* 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
*/
export async function unmount(props) {
     ReactDOM.unmountComponentAtNode(props.container ? props.container.querySelector('#root') : document.getElementById('microRoot'));
}
/**
* 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
*/
export async function update(props) {
     console.log('update props', props);
}

// __POWERED_BY_QIANKUN__ 能区别是否是微服务的形式访问
// 让微应用既能集成在容器应用中，又能单独访问
if (!window.__POWERED_BY_QIANKUN__) {
     ReactDOM.render(<App />, document.getElementById('microRoot'));
}
```

入口文件导入webpack_public_path

```javascript
if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2、修改微应用的打包工具配置

```javascript
// webpack.config.js
const packageName = require('./package.json').name;

module.exports = {
     output: {
          publicPath: 'http://****.shop.hualala.com/', // 微应用的前端服务地址
          library: `${packageName}-[name]`,
          libraryTarget: 'umd',
          chunkLoadingGlobal: `webpackJsonp_${packageName}`,
     },
};
```

3、设置微应用的前端服务资源能跨域访问

```
const devServer = {
     // ...
     headers: { 'Access-Control-Allow-Origin': '*' },
}
```

4、针对antd资源的调整：所有antd相关样式（dom class和css选择器）添加一个前缀，与父应用的antd样式区分开，避免相互影响

```javascript
// webpack.config.js
{
     loader: 'less-loader',
       options: {
         modifyVars: {
           '@ant-prefix': 'microPrefix',
         },
         javascriptEnabled: true,
       }
}
```

```javascript
// 配置 antd ConfigProvider
import { ConfigProvider } from 'antd';
export const MyApp = () => (
     <ConfigProvider prefixCls="microPrefix">
          <App />
     </ConfigProvider>
);
```

5、针对antd资源的调整：设置微应用的antd弹出框（Select, Tooltip, Menu 等等）渲染在微应用的根节点上

```javascript
// 配置 antd ConfigProvider
import { ConfigProvider } from 'antd';
   
export const MyApp = () => (
     <ConfigProvider prefixCls="microPrefix" getPopupContainer={() => document.getElementById('microRoot')}>
          <App />
     </ConfigProvider>
);
```


微前端不使用iframe的方式引入HTML主要是因为iframe有以下缺点和问题：
隔离性过强：iframe内的页面和主页面是完全隔离的，它们之间的交互较为复杂，通常要通过postMessage等API，不能直接调用彼此的函数或者访问DOM等。
样式隔离：iframe中的内容拥有自己的DOM和全局样式，这意味着它不继承父页面的样式。整合多个源自不同团队的微应用时，统一UI风格和界面交互变得困难。
性能问题：每个iframe都是一个独立的页面，会增加额外的HTTP请求，并且每个iframe都拥有自己的window、document对象，增加内存开销。对于性能要求较高的应用，这种开销可能是不可接受的。
安全限制：由于同源策略，不同源的iframe之间会有很多限制。即使是同源的iframe，其直接访问和操作也会被浏览器严格限制。
SEO不友好：搜索引擎优化（SEO）中，iframe的内容可能不会被爬虫脚本抓取和索引，这对需要SEO的应用而言是不利的。
路由不同步：iframe拥有独立的浏览器上下文，这意味着它有自己的历史栈，无法和主应用做到无缝的路由协调，且不利于构建单页应用（SPA）。
移动端适配问题：iframe在移动端设备上可能出现显示、滚动等多种问题，影响用户体验。
复杂的资源管理：由于iframe是独立的页面上下文，所以每个iframe都有自己的资源文件。尽管可以通过某些手段共享一些资源，如CDN缓存，但是这并不能从根本上解决重复加载的问题。
正是因为这些问题，微前端架构倾向于使用JavaScript和现代前端框架来实现应用之间的集成。现代的微前端方案如Single-SPA、qiankun等，提供了更加灵活和可扩展的方式来集成多个微应用，它们能够实现应用之间的更加紧密的集成，同时保持着应用的独立性和团队的开发自治。这些方案通常会通过JavaScript动态地加载和卸载应用的资源，并能够在应用之间做到无缝的路由控制和状态共享。