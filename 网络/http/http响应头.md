## 一、响应头信息
HTTP响应头（HTTP Response Headers）是服务器在响应客户端请求时返回的额外信息，描述了响应的各个方面，包括内容类型、缓存策略、服务器信息等。以下是一些常见且重要的HTTP响应头字段及其用途：

### 1. **Content-Type**
   - **描述**: 指定响应内容的MIME类型和字符编码，告知客户端如何解释响应的内容。
   - **示例**: `Content-Type: text/html; charset=UTF-8`

### 2. **Content-Length**
   - **描述**: 指定响应体的字节长度，有助于客户端确定内容的大小。
   - **示例**: `Content-Length: 348`

### 3. **Content-Encoding**
   - **描述**: 指定响应体使用的编码方式，如gzip或deflate，用于压缩数据以减少传输大小。
   - **示例**: `Content-Encoding: gzip`

### 4. **Cache-Control**
   - **描述**: 指定响应的缓存策略，控制缓存行为（如是否允许缓存、缓存时长等）。
   - **示例**: `Cache-Control: max-age=3600, must-revalidate`

### 5. **Expires**
   - **描述**: 指定响应过期的日期和时间，客户端可以使用此信息判断内容是否已过期。
   - **示例**: `Expires: Wed, 21 Oct 2020 07:28:00 GMT`

### 6. **ETag**
   - **描述**: 提供响应内容的唯一标识符，用于缓存验证。客户端可以在后续请求中使用此值确认内容是否发生变化。
   - **示例**: `ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"`

### 7. **Last-Modified**
   - **描述**: 指示资源的最后修改时间，客户端可以基于此时间判断内容是否需要更新。
   - **示例**: `Last-Modified: Wed, 21 Oct 2020 07:28:00 GMT`

### 8. **Set-Cookie**
   - **描述**: 向客户端设置Cookie，用于会话管理、用户跟踪等。可以指定Cookie的属性（如有效期、路径、域名等）。
   - **示例**: `Set-Cookie: sessionId=abc123; HttpOnly; Secure`

### 9. **Location**
   - **描述**: 在重定向响应（如301, 302）中指定重定向的目标URL，客户端将自动请求该URL。
   - **示例**: `Location: https://www.example.com/newpage`

### 10. **Server**
   - **描述**: 指示响应的服务器软件及其版本信息。
   - **示例**: `Server: Apache/2.4.1 (Unix)`

### 11. **Access-Control-Allow-Origin**
   - **描述**: 用于跨域资源共享（CORS），指定哪些域名可以访问该资源。`*`表示允许所有域名访问。
   - **示例**: `Access-Control-Allow-Origin: *`

### 12. **Content-Disposition**
   - **描述**: 指定如何处理响应的内容，是直接显示还是下载（作为附件）。这在文件下载中非常常见。
   - **示例**: `Content-Disposition: attachment; filename="filename.jpg"`

### 13. **X-Frame-Options**
   - **描述**: 用于防止点击劫持，指定是否允许页面通过`<iframe>`加载。`DENY`表示不允许，`SAMEORIGIN`表示只允许同源页面嵌入。
   - **示例**: `X-Frame-Options: SAMEORIGIN`

### 14. **X-Content-Type-Options**
   - **描述**: 告诉浏览器不要尝试猜测响应的内容类型，以防止MIME类型混淆攻击。通常设置为`nosniff`。
   - **示例**: `X-Content-Type-Options: nosniff`

### 15. **Strict-Transport-Security (HSTS)**
   - **描述**: 强制客户端（浏览器）在一定时间内只能通过HTTPS访问该服务器，提升安全性。
   - **示例**: `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### 16. **X-XSS-Protection**
   - **描述**: 启用浏览器的内建跨站脚本（XSS）防护机制，通常设置为`1; mode=block`，以阻止检测到的XSS攻击。
   - **示例**: `X-XSS-Protection: 1; mode=block`

### 17. **Content-Security-Policy (CSP)**
   - **描述**: 定义页面可以加载哪些资源，有助于防止跨站脚本（XSS）攻击和其他代码注入攻击。
   - **示例**: `Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com`

### 18. **Vary**
   - **描述**: 指示代理服务器如何缓存响应，根据请求头的不同值返回不同的响应。这通常与`Accept-Encoding`等字段结合使用。
   - **示例**: `Vary: Accept-Encoding, User-Agent`

### 19. **Retry-After**
   - **描述**: 指示客户端在指定时间后重试请求，通常在503服务不可用或429请求过多的情况下使用。
   - **示例**: `Retry-After: 120`

### 20. **Alt-Svc**
   - **描述**: 指定资源的替代服务，允许浏览器选择使用不同的协议（如HTTP/2或QUIC）来请求资源。
   - **示例**: `Alt-Svc: h2="alt.example.com:443"`

这些响应头字段为客户端提供了关于响应内容、缓存策略、安全性和跨域访问等方面的关键信息。在前端开发中，理解和正确使用这些头信息，有助于优化性能、提升安全性和增强用户体验。

## 二、cors响应头都有哪些
CORS（跨域资源共享）响应头用于指示服务器允许哪些跨域请求。以下是常见的 CORS 响应头及其作用：

### 1. `Access-Control-Allow-Origin`
指定允许访问资源的源（域名）。可以是具体的域名或通配符 `*`（表示允许所有域名）。
```http
Access-Control-Allow-Origin: https://example.com
```

### 2. `Access-Control-Allow-Methods`
指定允许的 HTTP 方法。通常在预检请求的响应中使用。
```http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

### 3. `Access-Control-Allow-Headers`
指定允许的自定义请求头。通常在预检请求的响应中使用。
```http
Access-Control-Allow-Headers: Content-Type, X-Custom-Header
```

### 4. `Access-Control-Allow-Credentials`
指示是否允许发送凭据（如 Cookies）。值为 `true` 或 `false`。
```http
Access-Control-Allow-Credentials: true
```

### 5. `Access-Control-Expose-Headers`
这个字段是给 XMLHttpRequest 对象赋能，让它不仅可以拿到基本的 6 个响应头字段（包括Cache-Control、Content-Language、Content-Type、Expires、Last-Modified和Pragma）
指定哪些响应头可以暴露给浏览器的 JavaScript 代码。默认情况下，只有少数标准头部可以被访问。
```http
Access-Control-Expose-Headers: X-Custom-Header, Content-Length
```
那么在前端可以通过 `XMLHttpRequest.getResponseHeader('X-Custom-Header')` 拿到 X-Custom-Header 这个字段的值。
### 6. `Access-Control-Max-Age`
指定预检请求的结果可以被缓存的时间（以秒为单位）。在此时间内，不需要重复发送预检请求。
```http
Access-Control-Max-Age: 3600
```

### 示例
以下是一个完整的 CORS 响应头示例，展示了如何配置这些头部：

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Custom-Header, Content-Length
Access-Control-Max-Age: 3600
```

### 解释
- `Access-Control-Allow-Origin: https://example.com`：只允许 `https://example.com` 访问资源。
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`：允许的 HTTP 方法。
- `Access-Control-Allow-Headers: Content-Type, X-Custom-Header`：允许的自定义请求头。
- `Access-Control-Allow-Credentials: true`：允许发送凭据。
- `Access-Control-Expose-Headers: X-Custom-Header, Content-Length`：暴露的响应头。
- `Access-Control-Max-Age: 3600`：预检请求结果缓存时间为 3600 秒。

通过正确配置这些 CORS 响应头，可以控制和管理跨域请求的行为，确保安全性和灵活性。