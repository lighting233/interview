[TOc]
# [http思维导图](https://www.processon.com/view/link/5c97952de4b0ab74ece439cd)

## 一、HTTP 请求信息和响应信息的格式
### 请求：
- （1）**请求行** 方法 + 路径 + http版本 `GET /home/test.php HTTP/1.1`
  - ***请求方法*** 
    1. GET: 通常用来获取资源
    2. HEAD: 获取资源的元信息（向服务器索要与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息）
    3. POST: 提交数据，即上传数据
    4. PUT: 修改数据 （向指定资源位置上传其最新内容）
    5. DELETE: 删除资源(几乎用不到)请求服务器删除Request-URI所标识的资源
    6. CONNECT: 建立连接隧道，用于代理服务器 (HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器)
    7. OPTIONS: 列出可对资源实行的请求方法，用来跨域请求
    8. TRACE: 追踪请求-响应的传输路径(回显服务器收到的请求，主要用于测试或诊断)
  - ***请求路径***  url 的一部分
  - ***所用的协议***
- （2）**请求头信息**
  - 头信息后跟空行，没有主体信息后边也要有空行
- （3）**请求主体信息(可以没有)**

### X-Forwarded-For产生的问题
前面可以看到，X-Forwarded-For这个字段记录的是请求方的 IP，这意味着每经过一个不同的代理，这个字段的名字都要变，从客户端到代理1，这个字段是客户端的 IP，从代理1到代理2，这个字段就变为了代理1的 IP。
但是这会产生两个问题:
1. 意味着代理必须解析 HTTP 请求头，然后修改，比直接转发数据性能下降。
2. 在 HTTPS 通信加密的过程中，原始报文是不允许修改的。
由此产生了**代理协议**，一般使用明文版本，只需要在 HTTP 请求行上面加上这样格式的文本即可:

[^1]: 在代理协议（如HTTP代理、SOCKS代理等）中，`tcp4`和`tcp6`是指不同的传输协议版本。它们的定义如下：**`tcp4`**: 代表IPv4（第四版互联网协议）下的TCP（传输控制协议）。IPv4使用32位地址，格式如`192.168.1.1`。当代理协议中提到`tcp4`时，它表示代理将通过IPv4协议处理TCP连接。**`tcp6`**: 代表IPv6（第六版互联网协议）下的TCP。IPv6使用128位地址，格式如`2001:0db8:85a3:0000:0000:8a2e:0370:7334`。当代理协议中提到`tcp6`时，它表示代理将通过IPv6协议处理TCP连接。

简单来说，`tcp4`和`tcp6`分别指代在IPv4和IPv6网络环境下的TCP连接。选择使用哪种协议通常取决于网络环境和具体的网络配置需求。
TCP4/TCP6[^1]
```
// PROXY + TCP4/TCP6 + 请求方地址 + 接收方地址 + 请求端口 + 接收端口
PROXY TCP4 0.0.0.1 0.0.0.2 1111 2222
GET / HTTP/1.1
...
```
### 响应：
- （1）**响应行** http版本、状态码和原因 `HTTP/1.1 200 OK`

  - ***请求方法*** 
    1. GET: 通常用来获取资源
  - ***请求路径*** 
  - ***所用的协议***
- （2）**响应头信息**
  - 头信息后跟空行，没有主体信息后边也要有空行
- （3）**响应主体信息**

---

## 二、GET 和 POST 有什么区别？

### 1. **请求的目的**
   - **GET**: 用于从服务器请求数据，通常是获取资源或信息。GET请求是幂等的，这意味着多次执行同一请求应该返回相同的结果。
   - **POST**: 用于向服务器**提交数据**，通常是**创建**或**更新资源**。POST请求通常会对服务器的数据产生影响（如新增记录），因此它不是幂等的。

### 2. **请求参数的传递方式**
   - **GET**: 参数通过URL传递，放在URL的查询字符串（`?`之后）。例如：`/search?q=example`。**只能接收 ASCII 字符**
   - **POST**: 参数放在请求体（body）中，通常不会显示在URL中。POST适合传递大量数据或者敏感数据。post 比 get 多了主体信息，头信息里就要标明主体长度。还要告诉服务器content-type

### 3. **URL长度限制**
   - **GET**: 由于参数在URL中传递，因此受限于浏览器和服务器的URL长度限制，通常在**2KB到8KB**之间。
   - **POST**: 请求数据放在请求体中，不受URL长度的限制，因此可以传递更大的数据量。

### 4. **数据的可见性**
   - **GET**: 参数会显示在URL中，因此对用户和第三方来说是可见的，容易被记录或缓存，不适合传递敏感信息。
   - **POST**: 参数在请求体中，用户不可见，适合传递敏感信息，但仍需结合HTTPS以确保传输过程中的安全性。

### 5. **缓存**
   - **GET**: GET请求的响应通常会被浏览器缓存，因为GET请求通常用于获取数据，重复请求相同URL通常返回相同结果。
   - **POST**: POST请求的响应通常不会被缓存，因为POST请求用于提交数据，可能导致服务器状态发生变化。

### 6. **浏览器行为**
   - **GET**: 在浏览器中，GET请求可以通过直接访问URL、点击链接、**刷新页面**等方式触发。GET请求可以被书签保存。
   - **POST**: POST请求通常通过提交表单、AJAX请求等方式触发，不能被书签保存或通过URL直接访问。

### 7. **安全性**
   - **GET**: 由于请求参数在URL中公开传递，GET请求对敏感信息不安全，可能被**URL日志**、**浏览器历史记录**或**第三方截取**。
   - **POST**: 请求数据在请求体中传递，对敏感信息较为安全，但仍需使用HTTPS以防止数据在传输中被截取。

### 8. **幂等性**
   - **GET**: GET请求是幂等的，意味着无论请求执行多少次，服务器的状态都不应该发生变化。
   - **POST**: POST请求通常不是幂等的，每次请求可能导致服务器状态变化（如创建新资源）。

### 9. **使用场景**
   - **GET**: 用于读取数据，不会对服务器状态造成影响。例如：查询信息、获取资源列表、访问静态页面。
   - **POST**: 用于提交数据，可能会改变服务器的状态。例如：提交表单数据、上传文件、创建新记录。

这些区别使得GET和POST在Web开发中适用于不同的场景。理解这些差异有助于选择合适的请求方法，提高应用的安全性和效率。

## 三、什么是跨域 ？

跨域是指在浏览器中，网页尝试从不同的源（即协议、域名、端口的组合）加载资源或进行请求的情况。由于浏览器的同源策略，这种行为受到限制，以防止潜在的安全问题。

### 1.什么是跨域？
[跨域](https://www.bilibili.com/video/BV1Km4y1u7Sd?spm_id_from=333.788.videopod.sections&vd_source=78435c3cefd4783245d9d16d09d19859)
同源策略是一种浏览器的安全机制，它要求：
- **协议**：请求的协议（如 HTTP 或 HTTPS）必须相同。
- **域名**：请求的域名必须相同。
- **端口**：请求的端口号必须相同（如果有端口的话）。

当网页尝试从不同的源加载资源（如跨域请求）时，就会触发跨域问题。跨域问题会影响到多种操作，如 AJAX 请求等。

#### 同源策略限制了以下操作：

1. AJAX 请求：一个网页不能通过 AJAX 请求访问不同源的资源。
2. DOM 操作：一个网页不能访问或操作来自不同源的 DOM 元素。
3. Cookies：一个源的 Cookie 不能被另一个源访问。

#### 非同源站点有这样一些限制:

- 不能读取和修改对方的 DOM
- 不读访问对方的 Cookie、IndexDB 和 LocalStorage
- 限制 XMLHttpRequest 请求，WebSocket 连接。(后面的话题着重围绕这个)

#### 跨域拦截是浏览器行为
- 跨域请求的响应一般会被浏览器所拦截，注意，是被浏览器拦截，响应其实是**成功到达客户端**了
- 简单请求和非简单请求的预检请求已经获取到数据但是被拦截，**非简单请求**的真正请求依然**没有发出**（不能请求）
- 在服务端处理完数据后，将响应返回，主进程检查到跨域，且**没有cors**(后面会详细说)响应头，将**响应体全部丢掉**，并不会发送给渲染进程。这就达到了拦截数据的目的。

### 2.为什么通过 `<script>` 标签请求的资源不算跨域？

在浏览器中，`<script>` 标签的行为与 AJAX 请求（通常是通过 `XMLHttpRequest` 或 `fetch` 实现的）有所不同：

1. **跨域 `<script>` 标签**： 
   - 当你使用 `<script>` 标签来加载资源时，浏览器不会对资源的来源进行严格的同源检查。无论你从哪个域加载 JavaScript 文件，它都会被执行。这是因为 `<script>` 标签的目的就是加载并执行外部代码，浏览器允许这种行为，以便网页可以从外部源引入功能。
   - 例如，`<script src="https://example.com/somefile.js"></script>` 可以成功加载并执行来自 `example.com` 的 JavaScript 文件，而不需要与当前页面的源相同。

2. **AJAX 请求**：
   - AJAX 请求（使用 `XMLHttpRequest` 或 `fetch`）受到严格的同源策略限制。浏览器通过对发起请求的源和响应的源进行检查来防止潜在的安全漏洞，如跨站请求伪造（CSRF）攻击或跨站脚本攻击（XSS）。
   - 如果通过 AJAX 请求访问不同源的资源，浏览器会阻止这些请求，除非目标服务器明确允许跨源访问，这通常是通过 CORS（跨源资源共享）机制实现的。

#### 跨域与安全

- **脚本标签**：允许跨域加载 JavaScript 的主要原因是脚本通常会被执行，而不是直接处理数据或做出重要的更改。允许跨域脚本使得网站能够动态加载功能。
  
- **AJAX 请求**：AJAX 请求可以发送和接收数据，这可能涉及敏感信息或操作，因此需要严格的同源策略来保护用户的安全和隐私。

### 3.跨域的三种解决方式

#### 1.CORS
它需要浏览器和服务器的共同支持，具体来说，非 IE 和 IE10 以上支持CORS，服务器需要附加特定的响应头。

在跨域资源共享（CORS, Cross-Origin Resource Sharing）中，HTTP请求被分为简单请求和复杂请求。为了确保安全性，浏览器在某些情况下会发送预检请求。下面是这些概念的详细解释：

##### 1. **简单请求（Simple Request）**
简单请求是符合特定条件的跨域HTTP请求。浏览器在处理这些请求时不会发送预检请求。简单请求需要满足以下条件：
   - **HTTP方法**：只允许使用`GET`、`POST`或`HEAD`方法。
   - **HTTP头字段**：请求只能包含以下头字段，且这些字段的值必须在规定范围内：
     - `Accept`
     - `Accept-Language`
     - `Content-Language`
     - `Content-Type`（但必须是`application/x-www-form-urlencoded`、`multipart/form-data`或`text/plain`之一）
   - **Content-Type**：如果是`POST`请求，`Content-Type`必须是上面提到的几种类型之一。

**示例**：
   - 一个使用`GET`方法获取资源的请求，并且只包含`Accept`头字段。
   - 一个使用`POST`方法提交表单，`Content-Type`为`application/x-www-form-urlencoded`的请求。
   - 
**浏览器做了什么？**
它会自动在请求头当中，添加一个Origin字段，添加一个**Host目标地址**用来说明请求来自哪个源。服务器拿到请求之后，在回应时对应地添加Access-Control-Allow-Origin字段，如果Origin不在这个字段的范围中，那么浏览器就会将响应拦截。
##### 2. **复杂请求（Complex Request）**
如果HTTP请求不满足简单请求的条件，它就被认为是复杂请求。复杂请求通常具有以下特点：
   - **HTTP方法**：使用了`PUT`、`DELETE`、`PATCH`等非简单方法。
   - **复杂的头字段**：请求中包含自定义头字段或其他不符合简单请求条件的头字段。
   - **Content-Type不符合要求**：如`application/json`。

**示例**：
   - 一个`PUT`请求更新资源。
   - 一个`POST`请求，`Content-Type`为`application/json`。
   - 一个包含自定义头字段（如`X-Custom-Header`）的请求。

##### 3. **预检请求（Preflight Request）**
预检请求是浏览器在发送复杂请求之前自动发出的`OPTIONS`请求，用于确定服务器是否允许该跨域请求。预检请求的目的是确保复杂请求在实际发送之前已经获得服务器的明确许可。

**预检请求的特征**：
   - **方法**：`OPTIONS`
   - **请求头**：
     - `Origin`：表示请求的来源。
     - `Access-Control-Request-Method`：实际请求将使用的HTTP方法。
     - `Access-Control-Request-Headers`：列出实际请求中使用的自定义头字段。

**服务器响应**：
   - `Access-Control-Allow-Origin`、
   - `Access-Control-Allow-Methods`、
   - `Access-Control-Allow-Headers`：允许的自定义请求头。
   - `Access-Control-Expose-Headers`： 暴露的响应头。那么在前端可以通过 `XMLHttpRequest.getResponseHeader('X-Custom-Header')` 拿到 X-Custom-Header 这个字段的值。
   - `Access-Control-Allow-Credentials`: 这个字段是一个布尔值，表示是否允许发送 Cookie，对于跨域请求，浏览器对这个字段默认值设为 false，而如果需要拿到浏览器的 Cookie，需要添加这个响应头并设为true, 并且在前端也需要设置withCredentials属性:
      ```js
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      fetch('https://another.com/resource', {
         method: 'GET',
         credentials: 'include'
      })
      ```
      **注意：**`Access-Control-Allow-Origin` 不能为通配符 `*`
   - `Access-Control-Max-Age`: 预检请求的有效期，在此期间，不用发出另外一条预检请求。

服务器来决定是否允许该请求。**如果允许，浏览器才会发送实际的复杂请求**。
##### 4. **为什么需要预检请求？**
   - **安全性**：预检请求确保服务器明确允许复杂的跨域请求，防止恶意请求在未经过验证的情况下对服务器资源进行访问或操作，进而保护用户数据和服务器资源。
   - **灵活性**：服务器可以基于预检请求中的信息做出决定，允许或拒绝特定的跨域请求，从而灵活地控制哪些资源可以被访问。
#### 2.Nginx 做反向代理

#### 3.JSONP

JSONP（JSON with Padding）是一种解决跨域请求限制的技术。它通过动态创建 `<script>` 标签来请求跨域资源，并利用 JavaScript 的回调函数来处理响应数据。以下是一个 JSONP 的示例：

##### 服务器端（假设使用 Node.js 和 Express）
服务器端需要返回一个 JavaScript 函数调用，而不是纯 JSON 数据。

```javascript
// server.js
const express = require('express');
const app = express();

app.get('/data', (req, res) => {
  const callback = req.query.callback;
  const data = { message: 'Hello, JSONP!' };
  res.send(`${callback}(${JSON.stringify(data)})`);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

##### 客户端
客户端通过动态创建 `<script>` 标签来请求跨域资源，并定义一个回调函数来处理响应数据。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JSONP Example</title>
</head>
<body>
  <h1>JSONP Example</h1>
  <div id="result"></div>
  <script>
    function handleResponse(data) {
      document.getElementById('result').innerText = data.message;
    }

    const script = document.createElement('script');
    script.src = 'http://localhost:3000/data?callback=handleResponse';
    document.body.appendChild(script);
  </script>
</body>
</html>
```

##### 解释
1. **服务器端**：
   - 服务器端定义了一个 `/data` 路由，接收 `callback` 参数。
   - 服务器返回一个 JavaScript 函数调用，函数名是 `callback` 参数的值，参数是 JSON 数据。

2. **客户端**：
   - 客户端定义了一个回调函数 `handleResponse`，用于处理服务器返回的数据。
   - 动态创建一个 `<script>` 标签，并将其 `src` 属性设置为跨域请求的 URL，包含 `callback` 参数。
   - 将 `<script>` 标签添加到文档中，浏览器会执行请求并调用回调函数。

通过这种方式，JSONP 实现了跨域请求，并且不受同源策略的限制。然而，JSONP 也有一些安全性问题，因为它允许执行任意的 JavaScript 代码，因此在使用时需要谨慎。

### 4.跨域请求携带 cookie 的问题

跨域请求是否携带 Cookie 取决于客户端和服务器的配置。以下是详细解释：

##### 1. 客户端配置
在客户端，跨域请求默认情况下不会携带 Cookie。要携带 Cookie，需要在请求中设置 `withCredentials` 属性。

##### 示例（使用 XMLHttpRequest）
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.withCredentials = true; // 允许携带 Cookie
xhr.send();
```

##### 示例（使用 Fetch API）
```javascript
fetch('https://api.example.com/data', {
  method: 'GET',
  credentials: 'include' // 允许携带 Cookie
})
.then(response => response.json())
.then(data => console.log(data));
```

##### 2. 服务器配置
服务器需要在响应中设置 `Access-Control-Allow-Credentials` 头部，允许携带凭据（如 Cookie）。

##### 示例（使用 Node.js 和 Express）
```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com'); // 允许的源
  res.header('Access-Control-Allow-Credentials', 'true'); // 允许携带凭据
  next();
});

app.get('/data', (req, res) => {
  res.json({ message: 'Hello, CORS with credentials!' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

##### 3. 服务器响应 `Access-Control-Allow-Credentials` 字段前是否携带 Cookie
在服务器响应 `Access-Control-Allow-Credentials` 字段之前，浏览器不会携带 Cookie。只有在服务器明确允许携带凭据的情况下，浏览器才会在后续请求中携带 Cookie。

##### 关键点总结
1. **客户端**：需要设置 `withCredentials`（XMLHttpRequest）或 `credentials: 'include'`（Fetch API）。
2. **服务器**：需要设置 `Access-Control-Allow-Credentials: true` 和 `Access-Control-Allow-Origin` 不能为通配符 `*`，必须是具体的源。
3. **顺序**：浏览器在发送请求时不会携带 Cookie，除非服务器在之前的响应中明确允许携带凭据。

##### 示例流程
1. **客户端请求**：
   ```javascript
   fetch('https://api.example.com/data', {
     method: 'GET',
     credentials: 'include'
   })
   .then(response => response.json())
   .then(data => console.log(data));
   ```

2. **服务器响应**：
   ```http
   HTTP/1.1 200 OK
   Access-Control-Allow-Origin: https://example.com
   Access-Control-Allow-Credentials: true
   Content-Type: application/json

   {"message": "Hello, CORS with credentials!"}
   ```

通过正确配置客户端和服务器，可以实现跨域请求时携带 Cookie。

---

## 四、http 请求的特点

### 优点

1. **灵活可扩展**，主要体现在两个方面。
   1. 一个是语义上的自由，只规定了基本格式，比如空格分隔单词，换行分隔字段，其他的各个部分都没有严格的语法限制。
   2. 另一个是传输形式的多样性，不仅仅可以传输文本，还能传输图片、视频等任意数据，非常方便。
2. **可靠传输**。HTTP 基于 TCP/IP，因此把这一特性继承了下来。这属于 TCP 的特性，不具体介绍了。
3. **请求-应答**。也就是一发一收、有来有回， 当然这个请求方和应答方不单单指客户端和服务器之间，如果某台服务器作为代理来连接后端的服务端，那么这台服务器也会扮演请求方的角色。
4. **无状态**。这里的状态是指通信过程的上下文信息，而每次 http 请求都是独立、无关的，默认不需要保留状态信息。一些应用仅仅只是为了获取一些数据，不需要保存连接上下文信息，无状态反而减少了网络开销，成为了 http 的优点

### 缺点

1. **无状态**。在需要长连接的场景中，需要保存大量的上下文信息，以免传输大量重复的信息，那么这时候无状态就是 http 的缺点了
2. **明文传输**。即协议里的报文(主要指的是头部)不使用二进制数据，而是文本形式。这当然对于调试提供了便利，但同时也让 HTTP 的报文信息暴露给了外界，给攻击者也提供了便利。WIFI陷阱就是利用 HTTP 明文传输的缺点，诱导你连上热点，然后疯狂抓你所有的流量，从而拿到你的敏感信息。
3. **队头阻塞问题**。当 http 开启长连接时，共用一个 TCP 连接，同一时刻只能处理一个请求，那么当前请求耗时过长的情况下，其它的请求只能处于阻塞状态，也就是著名的队头阻塞问题。接下来会有一小节讨论这个问题

### http的 keep-alive 和 tcp 的keep-alive有关吗？
1. 层次：Connection: keep-alive 是 HTTP 协议的功能，属于应用层。而 TCP keep-alive 是 TCP 协议的功能，属于传输层。它们分别工作在不同的网络协议层。
2. 目的：HTTP keep-alive 的目的是复用 TCP 连接以减少开销和延迟；而 TCP keep-alive 的目的是检测和维护连接的状态，确保连接在空闲时仍然保持有效。
3. 实现方式：HTTP keep-alive 是通过在应用层协议头部控制连接的关闭时机，而 TCP keep-alive 是通过定时发送探测包来确认连接的存活状态。

### 对于定长包的处理
- 通过指定`Content-Length`
- 实际内容比Content-Length长度长，截去掉
- 实际内容比Content-Length短，则读取错误

### 对于不定长包的处理
假设服务器要发送一个大的响应体，无法提前确定其总长度。在这种情况下，它可以使用 chunked 
在 chunked 传输编码下，消息主体被分割成若干块（chunk），**每块包含其自身的长度**标记，客户端可以逐块接收并处理数据。适用于无法提前确定消息体总长度的情况。
- 首先开启Connection: keep-alive
- 响应头`Transfer-Encoding: chunked` 当使用 HTTP/2 时，Transfer-Encoding 头通常不再使用，因为 HTTP/2 本身已经有内置的帧分块机制。
- Content-Length 字段会被忽略
- 基于长连接持续推送动态内容

### HTTP 如何处理大文件的传输？
- 服务端响应头`Accept-Ranges: none`,告知客户端支持范围请求
- 对于客户端而言，它需要指定请求哪一部分。通过`Range`这个请求头字段确定，格式为bytes=x-y。接下来就来讨论一下这个 Range 的书写格式:
  - 0-499表示从开始到第 499 个字节。
  - 500- 表示从第 500 字节到文件终点。
  - -100表示文件的最后100个字节。
- 服务器收到请求之后，首先验证范围是否合法，如果越界了那么返回**416**错误码，否则读取相应片段，返回**206**状态码。
- 同时，服务器需要添加`Content-Range`字段，这个字段的格式根据请求头中`Range`字段的不同而有所差异。

#### 单段数据
值得注意的是**Content-Range**字段，0-9表示请求的返回，100表示资源的**总大小**，很好理解
```http
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx
```
#### 多段数据 `Range: bytes=0-9, 30-39`
- `Content-Type: multipart/byteranges;boundary=00000010101`，它代表了信息量是这样的
  - 请求一定是多段数据请求
  - 响应体中的分隔符是 00000010101
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