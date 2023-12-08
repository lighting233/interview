//http无状态 cookie帮助识别身份 
//大小限制4kb
//不跨域共享，传递 例如一个页面里的iframe，端口号不同，拿不到
//有些情况可以设置共享 主域相同www.baidu.com image.baidu.com  设置cookie domain = .baidu.com

//session缺点
//占用内存，成本高
//多进程，多服务器时不好同步，需使用第三方缓存redis
//默认无法跨域

//jwt缺点
//用户信心存储在客户端，无法快速封禁用户
//万一服务端秘钥被泄露，用户信息全部丢失
//token一般体积大于cookie

## cookie session localStorage sessionStorage 区别
- 前端存储方式 cookie localStorage sessionStorage indexDb
- http请求时无状态的 （cookie特点可以每次请求的时候自动携带）可以实现用户登录功能. 使用cookie来识别用户
- 如果单纯的使用cookie,不建议存放敏感信息，如果被劫持到。（cookie是存在客户端，并不安全，用户可以自行篡改）
- 每个浏览器一般对请求头都有大小限制 cookie 不能大于4k，如果cookie过大，会导致页面白屏。 每次访问服务器都会浪费流量（合理设置cookie）  （http-only 并不安全 ，浏览器可以篡改可以模拟）
- sessionStorage 如果页面不关闭就不会销毁 （单页应用 访问时存储滚动条地址）
- localStorage 特点就是关掉浏览器后数据依然存在，如果不手动清楚一直都在 ，有大小限制5m,每次发请求不会携带  indexDB
- session特点，在服务器开辟一个空间来存储用户对应的信息（因为放在服务器里，可以存储敏感信息）
- session基于cookie的比cookie安全
- token -》 jwt -》 jsonwebtoken 不需要服务器存储，没有跨域限制

当谈到会话（session），令牌（token）和 JSON Web Token（jsonwebtoken）时，它们在身份验证和授权方面有不同的优缺点。下面是对它们的简要比较：

会话（Session）：

优点：
会话是一种服务器端存储用户状态的机制，可以在服务器上存储用户的身份验证和其他相关信息。
会话可以通过在服务器上存储敏感数据来提供更高的安全性。
会话可以在服务器上进行管理，包括过期时间、注销等。
缺点：
会话需要在服务器上存储状态信息，这可能会导致服务器负载增加。
会话在分布式系统中可能会面临一些挑战，因为需要在多个服务器之间共享状态。
令牌（Token）：

优点：
令牌是一种无状态的机制，不需要在服务器上存储任何状态信息。
令牌可以在客户端和服务器之间进行传递，减轻了服务器的负载。
令牌可以用于跨不同域的身份验证和授权。
缺点：
令牌通常需要通过加密和签名来确保安全性，这可能会增加一些复杂性。
令牌的有效期限制了其使用的持续时间，需要定期刷新。
JSON Web Token（jsonwebtoken）：

优点：
JSON Web Token 是一种开放标准，具有广泛的支持和工具库。
JSON Web Token 可以包含自定义声明，提供了灵活性。
JSON Web Token 可以通过签名来验证其完整性和真实性。
缺点：
JSON Web Token 的大小较大，可能会增加网络传输的开销。
JSON Web Token 默认情况下是基于 Base64 编码的，可能会导致一些安全风险。
总的来说，选择使用会话、令牌还是 JSON Web Token 取决于具体的应用场景和需求。会话适用于需要在服务器上存储状态信息的情况，令牌适用于无状态和分布式系统，而 JSON Web Token 是一种通用的、可扩展的标准，适用于跨不同域的身份验证和授权。