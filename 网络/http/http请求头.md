[TOC]
## 一、请求头信息
在HTTP请求中，请求头（HTTP Request Headers）包含了客户端向服务器发送的额外信息，用于描述请求的各个方面。这些头信息帮助服务器理解和处理请求。以下是一些常见且重要的HTTP请求头字段及其用途：

### 1. **Host**
   - **描述**: 指定服务器的主机名和端口号，客户端请求的目标服务器。
   - **示例**: `Host: www.example.com`

### 2. **User-Agent**
   - **描述**: 指定客户端软件的信息，通常包括浏览器名称、版本号、操作系统等信息，服务器可以基于此信息进行适配。
   - **示例**: `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36`

### 3. **Accept**
   - **描述**: 告诉服务器客户端可以处理的内容类型（MIME类型）。服务器可以基于此字段返回适合的响应内容。
   - **示例**: `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8`

### 4. **Accept-Language**
   - **描述**: 指定客户端接受的语言种类及优先级，服务器可以基于此提供不同的语言版本。
   - **示例**: `Accept-Language: en-US,en;q=0.5`

### 5. **Accept-Encoding**
   - **描述**: 指定客户端支持的内容编码类型，服务器可以返回压缩后的内容以节省带宽。
   - **示例**: `Accept-Encoding: gzip, deflate, br`

### 6. **Content-Type**
   - **描述**: 用于指定请求体的内容类型，通常用于POST或PUT请求，告知服务器请求体的数据格式。
   - **示例**: `Content-Type: application/json`

### 7. **Content-Length**
   - **描述**: 指定请求体的字节长度。对带有请求体的请求（如POST、PUT）尤其重要。
   - **示例**: `Content-Length: 348`

### 8. **Authorization**
   - **描述**: 包含客户端的身份验证信息，通常用于API认证或带有身份验证的资源访问。
   - **示例**: `Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l`

### 9. **Cookie**
   - **描述**: 包含客户端存储的Cookie信息，发送到服务器以便于维持会话状态或跟踪用户行为。
   - **示例**: `Cookie: sessionId=abc123; theme=light`

### 10. **Referer**
   - **描述**: 表示发起请求的来源页面地址，服务器可以基于此信息判断请求的来源，或用于安全检查。
   - **示例**: `Referer: https://www.google.com/`

### 11. **Connection**
   - **描述**: 控制连接的管理，比如是否保持连接打开以供后续请求使用（keep-alive）。
   - **示例**: `Connection: keep-alive`

### 12. **Cache-Control**
   - **描述**: 用于控制缓存行为的指令，可以指定请求的缓存方式或条件。
   - **示例**: `Cache-Control: no-cache`

### 13. **If-Modified-Since**
   - **描述**: 该字段用于条件请求，表示如果所请求的资源在指定的时间之后未被修改，服务器可以返回304（未修改），节省带宽。
   - **示例**: `If-Modified-Since: Wed, 21 Oct 2020 07:28:00 GMT`

### 14. **If-None-Match**
   - **描述**: 与ETag结合使用，用于条件请求，表示如果资源的ETag未发生变化，则返回304（未修改）。
   - **示例**: `If-None-Match: "5d8c72a4edda6a0c"`

### 15. **Origin**
   - **描述**: 指示发起请求的源（协议、域名、端口），用于跨域资源共享（CORS）检查。
   - **示例**: `Origin: https://www.example.com`

### 16. **X-Requested-With**
   - **描述**: 常用于Ajax请求中，表示请求由XMLHttpRequest发起。
   - **示例**: `X-Requested-With: XMLHttpRequest`

这些请求头信息为服务器提供了客户端的详细信息和请求上下文，有助于服务器正确理解和处理请求，从而返回合适的响应。

---

**在前端开发中，你可能还会遇到以下HTTP请求头字段，这些字段在具体应用场景中非常有用：**

### 1. **Access-Control-Request-Method**
   - **描述**: 在跨域资源共享（CORS）中，预检请求（OPTIONS）使用此字段告知服务器实际请求中使用的HTTP方法（如GET, POST）。
   - **示例**: `Access-Control-Request-Method: POST`

### 2. **Access-Control-Request-Headers**
   - **描述**: 预检请求中，用于告知服务器实际请求将使用的自定义头信息。服务器可以决定是否允许这些头信息。
   - **示例**: `Access-Control-Request-Headers: X-Custom-Header`

### 3. **DNT (Do Not Track)**
   - **描述**: 用于告知服务器用户是否愿意被追踪。`1`表示用户不希望被追踪，`0`表示用户允许追踪。
   - **示例**: `DNT: 1`

~~### 4. **ETag**~~
   - **描述**: 用于缓存验证的唯一标识符。客户端会在后续请求中通过`If-None-Match`字段将此值发送给服务器，以确认资源是否发生变化。
   - **示例**: `ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"`

### 5. **X-Forwarded-For**
   - **描述**: 用于标识客户端的真实IP地址，通常由代理服务器或负载均衡器添加，显示原始客户端的IP地址。字面意思就是为谁转发, 它记录的是请求方的IP地址，这意味着每经过一个不同的代理，这个字段的名字都要变，从客户端到代理1，这个字段是客户端的 IP，从代理1到代理2，这个字段就变为了代理1的 IP。
   - **示例**: `X-Forwarded-For: 192.168.1.1`

      **X-Real-IP**
   - **描述**: 是一种获取用户真实 IP 的字段，不管中间经过多少代理，这个字段始终记录最初的客户端的IP。
   - **示例**: `X-Forwarded-For: 192.168.1.1`
### 6. **X-Frame-Options**
   - **描述**: 用于防止点击劫持攻击，指定浏览器是否允许页面通过`<iframe>`加载。
   - **示例**: `X-Frame-Options: DENY`

### 7. **X-Content-Type-Options**
   - **描述**: 指示浏览器不要尝试猜测响应的内容类型，以防止MIME类型混淆攻击。通常设置为`nosniff`。
   - **示例**: `X-Content-Type-Options: nosniff`

### 8. **X-XSS-Protection**
   - **描述**: 用于启用浏览器的内建跨站脚本（XSS）防护机制，通常设置为`1; mode=block`以启用和强制阻止检测到的XSS攻击。
   - **示例**: `X-XSS-Protection: 1; mode=block`

### 9. **Referer-Policy**
   - **描述**: 用于控制在导航或子资源请求时，Referer头信息的发送情况，确保安全或隐私。
   - **示例**: `Referer-Policy: no-referrer`

### 10. **Content-Disposition**
   - **描述**: 指示如何处理响应内容，是直接显示还是下载（作为附件）。前端在处理文件下载时经常遇到。
   - **示例**: `Content-Disposition: attachment; filename="filename.jpg"`

### 11. **Authorization: Bearer Token**
   - **描述**: 作为更具体的认证方式，通常用于API请求中，携带JWT（JSON Web Token）进行认证。
   - **示例**: `Authorization: Bearer abcdef1234567890`

### 12. **Origin-Isolation**
   - **描述**: 告诉浏览器隔离该资源的上下文，避免共享某些资源，提升安全性。
   - **示例**: `Origin-Isolation: cross-origin`

### 13. **Clear-Site-Data**
   - **描述**: 指示浏览器清除指定类型的数据（如缓存、cookies、存储等），这在用户注销或安全场景中非常有用。
   - **示例**: `Clear-Site-Data: "cache", "cookies", "storage"`

### 14. **Forwarded**
   - **描述**: 类似`X-Forwarded-For`，但更标准化，包含客户端的原始IP地址和协议信息。
   - **示例**: `Forwarded: for=192.168.1.1; proto=https`

这些HTTP请求头字段涵盖了前端开发中可能遇到的各种场景，从安全性到跨域处理，再到缓存和认证管理。了解这些字段的用途有助于你在实际开发中更好地控制请求行为和响应处理。

---

## 二、Content-Type字段
`Content-Type` 是 HTTP 请求头和响应头中的一个字段，用于指示发送的实体的媒体类型（MIME 类型）。以下是一些常见的 `Content-Type` 值：

### 常见的 `Content-Type` 值

1. **文本类型**
   - `text/plain`: 纯文本
   - `text/html`: HTML 文档
   - `text/css`: CSS 样式表
   - `text/javascript`: JavaScript 代码

2. **应用类型**
   - `application/json`: JSON 数据
   - `application/xml`: XML 数据
   - `application/x-www-form-urlencoded`: 表单数据，通常用于 POST 请求
   - `application/octet-stream`: 二进制数据流，通常用于文件下载
   - `application/pdf`: PDF 文档
   - `application/zip`: ZIP 压缩文件
   - `application/vnd.ms-excel`: Microsoft Excel 文件
   - `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`: Microsoft Excel (OpenXML) 文件

3. **多部分类型**
   - `multipart/form-data`: 表单数据，通常用于文件上传
   - `multipart/byteranges`: 表示部分请求返回的数据

4. **图像类型**
   - `image/jpeg`: JPEG 图像
   - `image/png`: PNG 图像
   - `image/gif`: GIF 图像
   - `image/webp`: WebP 图像

5. **音频和视频类型**
   - `audio/mpeg`: MP3 音频
   - `audio/ogg`: Ogg 音频
   - `video/mp4`: MP4 视频
   - `video/webm`: WebM 视频

6. **其他类型**
   - `application/javascript`: JavaScript 代码
   - `application/ld+json`: JSON-LD 数据
   - `application/x-tar`: TAR 压缩文件

### 在发送端并没有对应的Content-Charset, 而是直接放在了Content-Type中：
```http
// 发送端
Content-Type: text/html; charset=utf-8
// 接收端
Accept-Charset: charset=utf-8
```
![两端对应情况](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/22/170ffd6bb6d09c2d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)
### 示例
以下是一些设置 `Content-Type` 的示例：

#### JSON 数据
```http
Content-Type: application/json
```

#### 表单数据
```http
Content-Type: application/x-www-form-urlencoded
```

#### 文件上传
```http
Content-Type: multipart/form-data
```

#### HTML 文档
```http
Content-Type: text/html
```

### 代码示例
在 JavaScript 中使用 `fetch` 设置 `Content-Type`：

```javascript
fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
});
```

通过了解和使用这些 `Content-Type` 值，你可以更好地处理和传输不同类型的数据。

---

## 三、http头中referer 和 origin 的区别
在 HTTP 请求头中，`Referer` 和 `Origin` 都用于指示请求的来源，但它们有不同的用途和信息内容。以下是它们的区别：

### `Referer` 头
- **定义**: `Referer` 头字段包含了当前请求的来源页面的 URL。
- **用途**: 用于告诉服务器请求是从哪个页面发起的。常用于分析流量来源、广告点击跟踪等。
- **内容**: 包含完整的 URL，包括协议、域名、路径和查询参数。
- **示例**:
  ```http
  Referer: https://example.com/page.html
  ```

### `Origin` 头
- **定义**: `Origin` 头字段包含了发起请求的源的协议、域名和端口。
- **用途**: 主要用于跨域资源共享 (CORS) 请求中，服务器可以根据 `Origin` 头来决定是否允许请求。
- **内容**: 只包含协议、域名和端口，不包括路径和查询参数。
- **示例**:
  ```http
  Origin: https://example.com
  ```

### 主要区别
1. **信息内容**:
   - `Referer` 包含完整的 URL（包括路径和查询参数）。
   - `Origin` 只包含协议、域名和端口。

2. **用途**:
   - `Referer` 用于指示请求的来源页面，常用于流量分析和广告跟踪。
   - `Origin` 用于跨域请求的安全检查，帮助服务器决定是否允许请求。

3. **隐私**:
   - `Referer` 可能会泄露更多的用户信息（如具体的页面路径和查询参数）。
   - `Origin` 提供更少的信息，通常用于安全性较高的场景。

### 示例
假设用户在 `https://example.com/page.html` 页面上点击了一个链接，链接指向 `https://another.com/resource`。

#### `Referer` 头
```http
GET /resource HTTP/1.1
Host: another.com
Referer: https://example.com/page.html
```

#### `Origin` 头
```http
GET /resource HTTP/1.1
Host: another.com
Origin: https://example.com
```

### 代码示例
在 JavaScript 中发起一个跨域请求时，浏览器会自动添加 `Origin` 头：

```javascript
fetch('https://another.com/resource', {
  method: 'GET',
  credentials: 'include'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

在这个请求中，浏览器会自动添加 `Origin` 头，但不会添加 `Referer` 头。`Referer` 头通常由浏览器在导航或资源请求时自动添加。

通过理解 `Referer` 和 `Origin` 的区别，你可以更好地控制和管理 HTTP 请求的来源信息。

## 四、用这两个头信息进行安全检测，但有些情况这些头信息会丢失，都是哪些情况
在某些情况下，HTTP 请求头中的 `Referer` 和 `Origin` 信息可能会丢失或被省略。以下是一些常见的情况：

### `Referer` 头丢失的情况
1. **HTTPS 到 HTTP 的跳转**:
   - 当用户从一个 HTTPS 页面导航到一个 HTTP 页面时，浏览器通常不会发送 `Referer` 头以保护用户隐私。
   
2. **隐私设置**:
   - 用户的浏览器隐私设置可能会阻止发送 `Referer` 头。例如，某些浏览器的隐私模式或扩展插件会禁用 `Referer` 头。

3. **Meta 标签或 HTTP 头**:
   - 页面可以通过 `<meta>` 标签或 HTTP 头来控制 `Referer` 头的发送。例如，使用 `Referrer-Policy` 头可以指定浏览器在发送 `Referer` 头时应包含哪些信息。
   ```html
   <meta name="referrer" content="no-referrer">
   ```
   或
   ```http
   Referrer-Policy: no-referrer
   ```

4. **跨域请求**:
   - 某些跨域请求可能不会包含 `Referer` 头，特别是在使用 `no-referrer` 或 `same-origin` 策略时。

5. **IE6、7下使用window.location.href=url进行界面的跳转，会丢失Referer。**
6. **IE6、7下使用window.open，也会缺失Referer。**

### `Origin` 头丢失的情况
1. **同源请求**:
   - 对于同源请求（即请求的源和目标在同一个域名、协议和端口下），浏览器通常不会发送 `Origin` 头。

2. **GET 请求**:
   - 对于简单的 GET 请求，浏览器可能不会发送 `Origin` 头，除非请求是**跨域**的。

3. **某些浏览器或版本**:
   - 某些旧版本的浏览器可能不支持或不发送 `Origin` 头。

4. **复杂==重定向==中可能会丢失**
   - 假设你从 https://example.com 发起一个请求，并被重定向到 https://another.com：
   - get 不丢失，post 丢失


### 示例
假设你有一个从 `https://example.com` 发起的请求：

#### HTTPS 到 HTTP 的跳转
```http
GET /resource HTTP/1.1
Host: another.com
// No Referer header
```

#### 隐私设置或 Referrer-Policy
```http
GET /resource HTTP/1.1
Host: another.com
Referrer-Policy: no-referrer
// No Referer header
```

#### 同源请求
```http
GET /resource HTTP/1.1
Host: example.com
// No Origin header
```

### 代码示例
在 JavaScript 中发起一个跨域请求时，浏览器会自动添加 `Origin` 头，但在某些情况下可能不会添加 `Referer` 头：

```javascript
fetch('https://another.com/resource', {
  method: 'GET',
  credentials: 'include'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

在这个请求中，如果 `https://another.com` 是跨域的，浏览器会添加 `Origin` 头，但 `Referer` 头可能会根据浏览器设置或页面的 `Referrer-Policy` 而丢失。

通过了解这些情况，你可以更好地设计和调试你的应用程序，确保在需要时正确地获取和使用 `Referer` 和 `Origin` 头信息。

---

## 五、Connection 头的作用

Connection 头字段在 HTTP 中的主要作用是控制连接的生命周期和管理连接的方式。
1. 通过 keep-alive 可以复用连接，提高性能；
   - 这种方式常用于 HTTP/1.1，HTTP/1.1 默认支持 keep-alive，即使没有显式设置 Connection: keep-alive，连接也会默认保持打开 
2. 通过 close 可以释放资源；
3. 通过 upgrade 可以实现协议的切换。这使得 HTTP 协议在不同场景下具有更大的灵活性和适应性
   - 例如，当使用 WebSocket 时，客户端可能会发送请求头 `Connection: Upgrade` 和 `Upgrade: websocket`，以请求切换到 WebSocket 协议 

## 六、`application/x-www-form-urlencoded`与`multipart/form-data`的区别

### `application/x-www-form-urlencoded`
- 其中的数据会被编码成以&分隔的键值对
- 字符以URL编码方式编码。
```js
// 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
"a%3D1%26b%3D2"
```
### `multipart/form-data`
- 请求头中的`Content-Type`字段会包含`boundary`，且boundary的值有浏览器默认指定`Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe`
- 请求体
```http
Content-Disposition: form-data;name="data1";
Content-Type: text/plain
data1
----WebkitFormBoundaryRRJKeWfHPGrS4LKe
Content-Disposition: form-data;name="data2";
Content-Type: text/plain
data2
----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
```
==在实际的场景中，对于图片等文件的上传，基本采用`multipart/form-data`而不用`application/x-www-form-urlencoded`，因为没有必要做 URL 编码，带来巨大耗时的同时也占用了更多的空间。==