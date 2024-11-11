# http

## 状态码
- **101 Switching Protocols**: 服务器同意客户端的协议转换请求（如切换到WebSocket协议）。
- **200 OK**: 请求成功，通常用于GET和POST请求。
- **204 No Content**: 请求成功，但服务器不返回任何内容。常用于不需要返回内容的操作。
- **206 Partial Content**: 服务器已成功处理部分GET请求。用于支持断点续传或分块下载。当然也会带上相应的响应头字段Content-Range
- **301 Moved Permanently**: 请求的资源已被永久移动到新位置，后续请求应使用新URI。
- **302 Found**: 请求的资源临时移动到新位置，但客户端应继续使用原有URI。**注意：**由于历史原因，用户代理可能会在重定向后的请求中把 POST 方法改为 GET 方法。如果不想这样，应该使用 307（Temporary Redirect） 状态码。（之后我们会详细叙述历史原因）
- **303 See Other**: 请求的资源可以在另一个URI找到，通常用于POST请求后的重定向。常用于将 POST 请求重定向到 GET 请求，比如你上传了一份个人信息，服务器发回一个 303 响应，将你导向一个“上传成功”页面。
- **304 Not Modified**: 客户端的缓存资源是最新的，服务器不返回内容。用于缓存控制。
- **307 Temporary Redirect**: 请求的资源临时移动到新位置，客户端应继续使用原有URI。与302不同，307必须使用相同的HTTP方法。307 状态码不允许浏览器将原本为 POST 的请求重定向到 GET 请求上。
- **308 Permanent Redirect**: 308 的定义实际上和 301 是一致的，唯一的区别在于，308 状态码不允许浏览器将原本为 POST 的请求重定向到 GET 请求上。
- **400 Bad Request**: 请求格式不正确，服务器无法理解。
- **401 Unauthorized**: 请求要求用户认证，未认证的请求被拒绝。
- **403 Forbidden**: 服务器理解请求，但拒绝执行。
- **404 Not Found**: 请求的资源在服务器上未找到。
- **405 Method Not Allowed**: 请求方法不允许用于请求的资源。
- **413 Payload Too Large**: 请求体太大，服务器无法处理。
- **414 URI Too Long**: 请求的URI太长，服务器无法处理。
- **416 Range Not Satisfiable**: 请求的范围无效，无法提供部分内容。
- **500 Internal Server Error**: 服务器遇到未知错误，无法完成请求。
- **502 Bad Gateway**: 服务器作为网关或代理时，接收到无效响应。
- **504 Gateway Timeout**: 服务器作为网关或代理时，未能及时从上游服务器获得响应。
---

## 请求头
1. Host
2. User-Agent
3. Accept
4. Accept-Language
5. Accept-Encoding
6. Content-Type
7. Content-Length
8. Authorization
9. Cookie
10. Cache-Control
11. If-Modified-Since
12. If-None-Match
13. Referer
14. Origin
15. Connection
16. Access-Control-Request-Method
17. Access-Control-Request-Headers
18. X-Forwarded-For

## 响应头
1. Content-Type
2. Content-Length
3. Content-Encoding
4. Expires
5. Cache-Control
6. Last-Modified
7. ETag
8. Set-Cookie: sessionId=abc123; HttpOnly; Secure
9. Server
10. X-Frame-Options
11. Access-Control-Allow-Origin
12. Content-Security-Policy (CSP)
13. Strict-Transport-Security (HSTS)

## 请求和响应
#### 请求
1. 请求行: 方法 + 路径 + http版本 `GET /home/test.php HTTP/1.1`
方法: 
   1. GET: 通常用来获取资源
   2. HEAD: 获取资源的元信息（向服务器索要与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息）
   3. POST: 提交数据，即上传数据
   4. OPTIONS: 列出可对资源实行的请求方法，用来跨域请求
2. 请求头信息: 头信息后跟空行，没有主体信息后边也要有空行
3. 请求主体信息(可以没有)
4. 请求行上可能有代理协议: `PROXY TCP4 0.0.0.1 0.0.0.2 1111 2222`
#### 响应
1. 响应行: `HTTP/1.1 200 OK`
2. 响应头信息: 头信息后跟空行，没有主体信息后边也要有空行
3. 响应主体信息

---

## GET 和 POST 有什么区别？
1. 请求参数的传递方式
2. URL长度限制
3. 数据的可见性
4. 缓存
5. 浏览器行为
6. 幂等性
7. 请求的目的

--- 

## 跨域

### 非同源站点有这样一些限制
- 不能读取和修改对方的 DOM
- 不读访问对方的 Cookie、IndexDB 和 LocalStorage
- 限制 XMLHttpRequest 请求

### CORS
1. 简单请求: 浏览器自动在请求头当中，添加一个Origin字段, 添加一个Host目标地址,服务器拿到请求之后，在回应时对应地添加Access-Control-Allow-Origin字段，如果Origin不在这个字段的范围中，那么浏览器就会将响应拦截。
   1. HTTP方法: 只允许使用`GET`、`POST`或`HEAD`方法。
   2. HTTP头字段: 
     - `Accept`
     - `Accept-Language`
     - `Content-Language`
     - `Content-Type`: 如果是`POST`请求（但必须是`application/x-www-form-urlencoded`、`multipart/form-data`或`text/plain`之一）
2. 复杂请求: 预检请求是浏览器在发送复杂请求之前自动发出的`OPTIONS`请求
     - `Access-Control-Allow-Origin`、
     - `Access-Control-Allow-Methods`、
     - `Access-Control-Allow-Headers`：允许的自定义请求头。
     - `Access-Control-Max-Age`: 预检请求的有效期，在此期间，不用发出另外一条预检请求。
     - `Access-Control-Allow-Credentials`: `Access-Control-Allow-Origin` 不能为通配符 `*`,并且在前端也需要设置withCredentials属性
### Nginx 做反向代理

### JSONP

---

## http的优缺点

### 优点
1. 灵活可扩展: 一个是语义上的自由, 传输类型的多样性
2. 可靠传输
3. 无状态

### 缺点
1. 无状态
2. 明文传输
3. 队头阻塞问题

## 分段传输

### 单段传输
```http
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx
```

### 多段数据
```http
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101--
```

---

## http1.1存在的问题
1. http1.1 的报文主体压缩，（压缩后的数据都是二进制数据，通常在传输过程中保持原始的二进制形式）但首部没有压缩
2. 队头阻塞问题: 雪碧图或域名分片技术
   1. 雪碧图和域名分片增加开发人员工作量
   2. 同一个域名下持久连接数有限，连接太多可能造成 ddos 攻击
   3. 虽然进行了域名分片，但 tcp 有慢启动，起始速度还是慢
3. 明文传输
4. 不支持服务端推送

## http2.0解决了哪些问题
1. HTTP/2 的首部压缩: 静态表, 动态表
2. 二进制分帧: 多路复用
3. http2 默认使用 TLS 加密，因为都已经进行二进制分帧了
4. 支持服务端推送

## http2.0还存在哪些问题？
1. TCP 队头阻塞
2. TCP 以及 TCP+TLS建立连接的延时: TCP1.5个RTT,TLS有两个版本——TLS1.2和TLS1.3，每个版本建立连接所花的时间不同，大致是需要1~2个RTT。
3. 服务端推送: 误点增加了很多缓存; DDOS 非对称攻击
4. ip+端口四元组,切换移动网络断联

## http3.0

### 优点
1. http3 的应用层上没有所谓的帧的概念，把数据帧移到了传输层里，数据帧再封装成数据包,quic 帧的内容被 tls 加密了 ，quic 数据包被 udp 分装成数据段
2. 数据包在帧上又加了些信息，connection ID，网络发生变化,可以识别为同一个连接
3. 0Rtt
4. 解决队头阻塞(http2的流ID是在应用层层面,tcp层面丢包需要重传确认,tcp不知道应用层的流ID;http3是在传输层层面的流ID,可以把相同的流交付应用层)
**注意:**大多数 QUIC 实现很少同时创建包含来自多个流（streams）的数据包（packets）。如果其中一个数据包丢失，则会立即导致单个数据包中所有流的队头阻塞！
## 缺点
1. 公司可能希望在他们的防火墙上阻止它，因为检测不需要的流量变得更加困难(端到端加密,http2有握手过程,相对好分析)
2. ISP 和中间网络可能会阻止它，因为不再容易获得诸如平均延迟和丢包率之类的指标(在 HTTP/2 的 TCP/TLS 连接中，虽然数据内容是加密的，但 TCP 的连接信息仍然是可见)
3. QUIC 具有更高的加密开销: http2一个数据流可能有多个包,一次为这些包进行一次加密;http3为每个数据包加密
4. QUIC 不能完全保证首先发送的数据也会首先被接收

