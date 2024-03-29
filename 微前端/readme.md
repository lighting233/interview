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