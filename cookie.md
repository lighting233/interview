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