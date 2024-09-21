# csrf
跨站请求伪造（CSRF，Cross-Site Request Forgery）

## 1.类型
1. get型: img标签里src是个get请求
2. post型: 页面构造一个表单,进入后直接获取表单元素执行submit
3. 链接型: a标签的href是个get请求,点击发送请求

## 2.防护措施
上文中讲了CSRF的两个特点：
- CSRF（通常）发生在第三方域名。
- CSRF攻击者不能获取到Cookie等信息，只是使用。
- 
针对这两点，我们可以专门制定防护策略，如下：
1. 阻止不明外域的访问
  - 同源检测 `origin`,`referer`: 当用户从一个 `HTTPS` 页面导航到一个 `HTTP` 页面时，浏览器通常不会发送 `Referer` 头以保护**用户隐私**。假设你从 `https://example.com` 发起一个请求，并被重定向到 `https://another.com`;`post`请求的`origin`会丢失
  - `Samesite Cookie`
2. 提交时要求附加本域才能获取的信息
  1. `CSRF Token`: 表单是三方网站伪造的,表单上的中的`CSRF Token`是用户自己访问网站才有的,三方网站没办法构造
  2. 双重 Cookie 验证
  3. 使用验证码（CAPTCHA）
  4. 缩短会话有效期
## 3.双重提交 Cookie
1. 服务器生成 CSRF Token 并将其存储在 cookie 中。
2. 发送请求时，客户端通过 HTTP 请求头或请求体传递 token。
3. 服务器验证 cookie 和请求中的 token 是否一致。如果一致，则认为请求有效。
### 使用双重cookie时,危险网站为什么不能拿到cookie中的token构造表单请求?
当恶意网站构造 CSRF 攻击时，它只能通过用户的浏览器发送请求，而浏览器只会自动带上 Cookie 中的值
（但恶意网站无法直接读取这些 Cookie 的内容）。这意味着即便攻击者知道如何构造表单请求，它无法读取 Cookie 中的 CSRF Token，也就无法将其附加到请求中。
恶意网站无法通过 JavaScript 访问用户在其他网站（受害者网站）上的 Cookie。