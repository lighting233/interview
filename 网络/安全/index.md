# 其他安全问题

## 1.**点击劫持**
**原理:**:
1. 恶意网站中使用iframe加载目标网站
2. iframe目标网站被设置成透明的
3. 在上边覆盖诱导点击的按钮

**防治**
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
  内嵌在其他网站的iframe发送的请求也是跨站的
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

---

## 2.三方`npm`依赖包的安全风险
为了提高 npm 依赖的安全，npm 6.1 后添加了 `npm audit` 工具，这个工具可以搜索当前项目中使用的依赖是否存在安全问题，并提供了 `npm audit fix` 工具修复。
它的工作原理是维护了一个已知不良依赖的名单，如果代码中使用了直接从 GitHub 而不是 npm 仓库中获取依赖，或不知名的依赖。npm audit 也是无法发现威胁。
总的来说在加入第三方依赖时，需要谨慎考虑，不滥用依赖在前端开发也是非常重要的。
例如l`odash`的原型污染.

---

## 3.**敏感信息脱敏**

### 前端传输密码是否需要加密
**有必要加密：**
1. 防止无意泄露和二次伤害。（打 debug 日志无意间把用户输入打到日志）.可以防止无意泄露和二次伤害。比如打 debug 日志可能会无意间把用户输入打到日志里，这样会泄露用户密码明文。
2. 隐私合规问题，参差不齐的员工可以拿到密码加用户手机号，登录任何设置此密码的网站。

**无必要加密:**
1. https + 后端加密入库足够安全。
2. 后端需要验证密码复杂度（业务场景）
3. 增加开发成本，没必要。
4. 加密后导致密码强度的下降(因为密文的信息熵下降了)

还有黑客流量复制攻击，不是所有攻击都会改代码的，有种攻击是**观察者模式**，
只在网络层增加一个转发插件把流量全部转发给自己。如果用户提交了明文密码，那密码就会泄露。如果是前端摘要过的，那只会泄露 hash 。

---

## 4.**DDOS攻击**
ISP近源清洗：Internet服务提供商（ISP）可以在其网络边界处部署DDoS防御设备，对进入其网络的流量进行监测和过滤。这样可以阻止大部分恶意流量进入目标网络。
云清洗/CDN硬抗：使用云服务提供商的DDoS防护服务或内容分发网络（CDN）可以帮助抵御大规模的DDoS攻击。这些服务通常具备强大的基础设施和分布式防御机制，能够分担和过滤掉攻击流量。
DC级近目的清洗：数据中心级别的近目的清洗是指在目标服务器所在的数据中心内部进行DDoS防护。这可以通过在数据中心内部部署专用的DDoS防护设备来实现，以便及早识别和过滤掉攻击流量。
OS/APP层防御：在操作系统（OS）和应用程序（APP）层面上，可以采取一些防御措施来减轻DDoS攻击的影响。例如，使用防火墙、负载均衡器和反向代理来过滤和分发流量，设置连接和请求限制，以及实施有效的访问控制策略。

---

## 5.**window.parent,window.top,window.top属性的区别，用他们检测试否被其他网站 iframe 嵌套安全吗**？

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

## 6.**lodash之前发生的原型污染是怎么回事**?

Lodash 的原型污染漏洞，是一种常见的安全问题，尤其在使用 JavaScript 库时需要特别注意。这种漏洞允许攻击者通过修改对象的原型链，来影响所有通过该原型创建的对象，从而导致潜在的安全风险。Lodash 之前的原型污染问题是由于其深度合并函数（如 `_.merge` 或 `_.defaultsDeep`）没有正确处理输入数据，允许恶意用户操控对象的原型链。

### 原型污染漏洞的具体机制

在 JavaScript 中，每个对象都有一个原型（`prototype`），其他对象可以继承该原型中的属性。如果能操控原型链，就可以影响大量的对象。以下是原型污染的典型过程：

1. **原型污染的核心问题**：Lodash 中的某些方法，如 `_.merge`，可以递归地合并对象。如果攻击者传入一个对象，其键是 `__proto__`，并且该键的值是一个对象，那么 Lodash 会递归地将这些值合并到目标对象的原型链中。
   
2. **漏洞的表现**：通过合并时没有进行检查，Lodash 会将攻击者提供的 `__proto__` 属性直接合并到目标对象的原型链中。攻击者因此可以通过污染原型链，影响到整个 JavaScript 运行环境中的其他对象。

3. **潜在的危害**：如果原型链被污染，攻击者可以通过这个途径修改或覆盖某些原型属性，进而影响所有使用这些原型属性的对象。例如，攻击者可以通过污染原型链将某个全局属性设为恶意代码，或者使某些关键函数行为发生变化。

### 漏洞利用示例

假设我们有以下代码：

```javascript
const _ = require('lodash');

let safeObject = {};
_.merge(safeObject, JSON.parse('{"__proto__": {"polluted": "yes"}}'));

console.log({}.polluted); // 输出: "yes"
```

在这个例子中，攻击者通过 `_.merge` 函数将恶意对象 `{ "__proto__": { "polluted": "yes" } }` 合并到目标对象中，导致目标对象的原型链被修改，任何通过该原型创建的对象都会带有 `polluted` 属性。这就是原型污染。

### 修复方案

Lodash 在后来的版本中修复了这个漏洞。修复的方式通常包括：
- **输入验证**：在深度合并对象时，忽略像 `__proto__`、`constructor` 和 `prototype` 这样的特殊属性，避免它们被用来污染原型链。
- **限制对象合并范围**：确保合并操作只作用于真正的用户数据，不对 JavaScript 内部的原型结构进行操作。

### 防御措施

除了依赖库本身的修复外，开发者在使用 Lodash 或其他类似工具时，也可以采取一些防御措施：
- **升级库**：确保使用的是没有该漏洞的最新版本。
- **输入过滤**：在处理用户输入时，严格过滤掉可疑的属性（如 `__proto__`）。
- **启用对象的深度冻结**：对关键对象使用 `Object.freeze` 来防止它们被修改。

Lodash 的原型污染问题提醒我们在使用第三方库时，务必要及时关注其安全更新，并遵循最佳的安全实践。