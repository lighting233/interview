## 一、禁止自己的网站作为 iframe 被其他网站加载，除了配置X-FRAME-OPTIONS，还有其他方法吗？

### 1. **X-Frame-Options**
   - **描述**: 用于防止点击劫持，指定是否允许页面通过`<iframe>`加载。`DENY`表示不允许，`SAMEORIGIN`表示只允许同源页面嵌入。
   - **示例**: `X-Frame-Options: SAMEORIGIN`

除了配置 `X-Frame-Options` 头之外，还有其他方法可以防止自己的网站被嵌入到其他网站的 `iframe` 中：

### 2. **Content Security Policy (CSP)**

CSP（内容安全策略）是一种强大的安全机制，可以通过设置 `frame-ancestors` 指令来控制哪些来源可以将当前页面嵌入到 `iframe` 中。

- **配置方式：**
  在服务器的响应头中设置以下内容：

  ```http
  Content-Security-Policy: frame-ancestors 'self'
  ```

  这样可以确保只有相同域名的页面（`self`）可以将该页面嵌入到 `iframe` 中。如果希望特定的域名可以嵌入，可以指定这些域名：

  ```http
  Content-Security-Policy: frame-ancestors 'self' https://trusted.com
  ```
  ```http
  Set-Cookie: key=value; SameSite=Strict;
  ```
  这将阻止您的网站被任何 iframe 嵌入。

- **优点：**
  - 更加灵活，可以精确指定允许的域名。
  - 支持多个域名和协议。

### 2. **JavaScript 方法**

通过 JavaScript，检测页面是否被嵌入到 `iframe` 中，如果是则跳转或阻止加载。

- **检测并跳转：**

  ```javascript
  if (window.self !== window.top) {
      window.top.location = window.location.href;
  }
  ```

  这段代码会检查当前页面是否是顶级窗口（即是否在 `iframe` 中），如果不是，则强制跳转到顶级窗口，从而防止嵌入。

- **检测并阻止加载：**

  ```javascript
  if (window.self !== window.top) {
      document.body.innerHTML = 'This page cannot be displayed in a frame.';
  }
  ```

  这种方式会直接清空页面内容，从而防止嵌入。

### 3. **使用 SameSite Cookie 属性**

虽然 `SameSite` 属性的主要目的是防止跨站请求伪造（CSRF），但设置为 `Strict` 或 `Lax` 也可以减少网站在跨域的 `iframe` 中被加载的情况，尤其是在同一站点用户身份验证相关的上下文中。

- **配置方式：**

  ```http
  Set-Cookie: key=value; SameSite=Strict;
  ```

  这确保了 cookie 仅在来自同一站点的请求中被发送，有助于防止其他网站通过 `iframe` 引入会话信息。

### 4. **Referrer-Policy 和 Strict-Transport-Security (HSTS)**

虽然这些策略主要用于其他安全目的，如防止信息泄露和确保 HTTPS，但它们结合 CSP 和 `X-Frame-Options`，可以提供更全面的安全措施。

### 5. **Server-side Frame Busting Techniques**

在服务端实现一些逻辑，如检测请求头的 `Referer`，判断页面是否是从其他站点发起的嵌入请求，可以结合拒绝服务的策略。

### 6. **避免 GET 参数直接操作**

防止页面使用 `GET` 请求直接加载敏感信息，并结合 POST 方法及表单操作，这样即使页面被嵌入，攻击者也不能简单地通过 GET 参数操控页面行为。

## 二、window.parent,window.top,window.top属性的区别，用他们检测试否被其他网站 iframe 嵌套安全吗？
`window.parent`, `window.top`, 和 `window.self` 是 JavaScript 中用于访问不同层级的窗口对象的属性。它们各自有不同的用途，可以用来检测当前页面是否被其他网站的 `iframe` 嵌套。

### 1. **window.parent**
- **用途**: `window.parent` 指向当前窗口的父窗口。如果当前窗口是一个 `iframe`，那么 `window.parent` 就是包含这个 `iframe` 的那个窗口。如果当前窗口本身就是顶级窗口，那么 `window.parent` 就等同于 `window.self`。
  
- **检测嵌套**: 你可以通过检查 `window.parent` 是否与 `window.self` 不同，来检测当前窗口是否被嵌套在另一个页面中。

  ```javascript
  if (window.parent !== window.self) {
      // 当前页面被嵌套在 iframe 中
  }
  ```

### 2. **window.top**
- **用途**: `window.top` 指向当前窗口的顶层窗口，不论当前窗口被嵌套在多少层 `iframe` 中，`window.top` 始终指向最外层的顶级窗口。

- **检测嵌套**: 如果 `window.top` 与 `window.self` 不同，说明当前窗口被嵌套在其他 `iframe` 中。

  ```javascript
  if (window.top !== window.self) {
      // 当前页面被嵌套在 iframe 中
  }
  ```

### 3. **window.self**
- **用途**: `window.self` 是对当前窗口对象的引用。它始终指向当前的窗口或框架（`iframe`）对象。

- **配合使用**: `window.self` 通常用于配合 `window.parent` 或 `window.top` 进行嵌套检测。

### **嵌套检测的安全性**
通过上述方式检测页面是否被嵌套在 `iframe` 中是相对安全的，但并非绝对安全。以下几点可以作为嵌套检测的安全措施：

1. **基本检测**: 检查 `window.parent !== window.self` 和 `window.top !== window.self` 是常见的检测方法。它们可以有效检测出页面是否被嵌套。

2. **阻止嵌套**: 如果你确定不希望页面被嵌套，可以在检测到嵌套后进行跳转或阻止加载。

   ```javascript
   if (window.top !== window.self) {
       window.top.location = window.location.href;
   }
   ```

3. **防止遮蔽攻击**: 有些攻击者可能会试图通过覆盖 `window.top` 等对象来绕过检测。使用 `try-catch` 语句可以防止这种情况。如果攻击者设法篡改了 window.top，使得访问它时出现异常，try-catch 可以捕获这个异常，并执行相应的处理逻辑，比如阻止页面继续加载或重定向。

   ```javascript
   try {
       if (window.top !== window.self) {
           window.top.location = window.location.href;
       }
   } catch (e) {
       // 处理异常，例如记录日志或执行其他安全措施
   }
   ```

### **总结**
- `window.parent` 用于访问当前窗口的父窗口。
- `window.top` 用于访问当前窗口的顶层窗口。
- `window.self` 引用当前窗口对象本身。

这些属性可以用于检测页面是否被嵌套在 `iframe` 中，并采取相应的安全措施来防止被恶意嵌套。