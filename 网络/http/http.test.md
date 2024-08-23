## 一、HTTP 请求信息和响应信息的格式
==方法 + 路径 + http版本==
### http的请求方法有哪些？
haed
put
~~option~~ options **返回服务器针对特定资源所支持的HTTP请求方法。也可以利用向Web服务器发送'*'的请求来测试服务器的功能性。**
delete
==6. CONNECT: 建立连接隧道，用于代理服务器 (HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器)==
==8. TRACE: 追踪请求-响应的传输路径(回显服务器收到的请求，主要用于测试或诊断)==
## 二、GET 和 POST 有什么区别？

## 三、http头中referer 和 origin 的区别

## 四、用这两个头信息进行安全检测，但有些情况这些头信息会丢失，都是哪些情况
**Meta 标签或 HTTP 头**:

**同源请求**

 **复杂==重定向==中可能会丢失**
## 三、什么是跨域 ？

### 1.什么是跨域？


#### 非同源站点有这样一些限制:

#### 跨域拦截是浏览器行为

### 2.为什么通过 `<script>` 标签请求的资源不算跨域？

### 3.跨域的三种解决方式

##### 1. **简单请求（Simple Request）**

##### 2. **复杂请求（Complex Request）**

##### 3. **预检请求（Preflight Request）**

#### 3.JSONP

### 4.跨域请求携带 cookie 的问题

##### 1. 客户端配置

##### 2. 服务器配置

##### 3. 服务器响应 `Access-Control-Allow-Credentials` 字段前是否携带 Cookie

## 四、http 请求的特点

### 优点
- 灵活性
  - 文本格式上
  - 传输类型上

### 缺点


### http的 keep-alive 和 tcp 的keep-alive有关吗？


### 对于定长包的处理


### 对于不定长包的处理
==Transfer-Encoding: chunked==

### HTTP 如何处理大文件的传输？
- ~~content-range：none~~  服务端响应头`Accept-Ranges: none`,告知客户端支持范围请求
- range
- 416 206
- Content-Range

#### 单段数据

#### 多段数据
- `Range: bytes=0-9, 30-39`
- `Content-Type: multipart/byteranges;boundary=00000010101`

## 五、Connection 头的作用
- 例如，当使用 WebSocket 时，客户端可能会发送请求头 `Connection: Upgrade` 和 `Upgrade: websocket`，以请求切换到 WebSocket 协议 


## 六、`application/x-www-form-urlencoded`与`multipart/form-data`的区别
- 请求头中的`Content-Type`字段会包含`boundary`，且boundary的值有浏览器默认指定`Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe`
