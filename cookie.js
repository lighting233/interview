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