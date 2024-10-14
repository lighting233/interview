# jsBridge
[jsBridge1](https://juejin.cn/post/7355117271213899776?searchId=202410121119464FC14EF9E686A73D51E4)
[jsBridge2](https://www.bilibili.com/video/BV1PJ4m1n7VM/?spm_id_from=333.337.search-card.all.click&vd_source=78435c3cefd4783245d9d16d09d19859)

## native调用js
`Native`端调用`Web`端，`JavaScript`作为**解释性语言**，最大的一个特性就是可以随时随地地**通过解释器执行一段JS代码**，所以可以将拼接的`JavaScript`代码字符串，传入JS解析器执行就可以，JS解析器在这里就是`webView`。
```java
webView.evaluateJavascript("javascript:yourFunction('" + param + "')", new ValueCallback<String>() {  
    @Override  
    public void onReceiveValue(String value) {  
        // 处理JavaScript的返回值  
    }  
});
```

## web调用native方法

### 1.URL Schema
`Native`加载`WebView`之后，Web发送的所有请求都会经过`WebView`组件，所以`Native`可以重写`WebView`里的方法，从来拦截Web发起的请求，我们对请求的格式进行判断：
- 符合我们自定义的`URL Schema`，对URL进行解析，拿到相关操作、操作，进而调用原生Native的方法
- 不符合我们自定义的`URL Schema`，我们直接转发，请求真正的服务
- `native`如何执行回调?在url后边拼接`callbackID`(js的`function`名称),通过`evaluateJavascript`执行这个回调并传入`native`的参数即可
**缺点:**
1. 但是由于是基于URL的方式，长度受到限制而且不太直观
2. 数据格式有限制
3. 而且建立请求有时间耗时。

### 3.在Webview中注入JS API
通过`webView`提供的接口，App将Native的相关接口注入到JS的`Context（window）`的对象中
```java
// 注入全局JS对象
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
    private Context ctx;
    NativeBridge(Context ctx) {
        this.ctx = ctx;
    }

    // 绑定方法
    @JavascriptInterface
    public void showNativeDialog(String text) {
        new AlertDialog.Builder(ctx).setMessage(text).create().show();
    }
}
```

```js
// 调用nativeBridge的方法
window.NativeBridge.showNativeDialog('hello');
```



