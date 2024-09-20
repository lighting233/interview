
const express = require('express');
const http = require('http');
const updateCompiler = require('./utils/updateCompiler');
const webpackDevMiddleware = require('../../webpack-dev-middleware');
const io = require('socket.io');

class Server{
    constructor(compiler,devServerArgs){
        this.sockets = [];
        this.compiler = compiler;
        this.devServerArgs = devServerArgs;
        //todo 会把webpack/hot下的发布订阅和建立socket.on的方法unshift加入 entry。变更入口后通知 webpack 按新入口进行编译，这样 html 就相当于有了hmr.js
        updateCompiler(compiler);
        this.setupHooks();//todo 4.注册编译完成向客户端发送最新的hash值的钩子
        this.setupApp();//todo 5.启动 express 服务
        this.routes();// 设置静态文件的根目录的
        // todo 6.设置中间件,真正的以监听模式启动webpack的编译;
        //webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。
        //当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念  
        this.setupDevMiddleware();
        this.createServer(); //todo 7.启动 http 服务
        this.createSocketServer(); //todo 8. 建立 websocket 连接
    }
   
    setupDevMiddleware(){
        //todo 真正的以监听模式启动webpack的编译
        this.middleware = webpackDevMiddleware(this.compiler);
        this.app.use(this.middleware);
    }
    setupHooks(){
        //当webpack完成一次完整的编译之后，会触发的done这个钩子的回调函数执行
        //编译成功后的成果描述(modules,chunks,files,assets,entries)会放在stats里
        this.compiler.hooks.done.tap('webpack-dev-server',(stats)=>{
            console.log('新的一编译已经完成,新的hash值为',stats.hash);
            //以后每一次新的编译成功后，都要向客户端发送最新的hash值和ok
            this.sockets.forEach(socket=>{
                socket.emit('hash',stats.hash);
                socket.emit('ok');
            });
            this._stats=stats;//保存一次的stats信息
        });
    }
    routes(){
        if(this.devServerArgs.contentBase){
            //此目录将会成为静态文件根目录
            //在这里，express.static(this.devServerArgs.contentBase) 中间件被挂载到应用程序中，这意味着所有对静态文件的请求都会被重定向到 contentBase 目录。
            //请求 http://localhost:8080/index.html 会返回 public/index.html 文件。
           this.app.use(express.static(this.devServerArgs.contentBase));
        }
    }
    setupApp(){
        //this.app并不是一个http服务，它本身其实只是一个路由中间件
        this.app = express();
    }
    createServer(){
        this.server = http.createServer(this.app);
    }
    createSocketServer(){
        //websocket通信之前要握手，握手的时候用的HTTP协议
        const websocketServer = io(this.server);
        //监听客户端的连接
        websocketServer.on('connection',(socket)=>{
            console.log('一个新的websocket客户端已经连接上来了');
            //把新的客户端添加到数组里,为了以后编译成功之后广播做准备
            this.sockets.push(socket);
            //监控客户端断开事件
            socket.on('disconnect',()=>{
                let index = this.sockets.indexOf(socket);
                this.sockets.splice(index,1);
            });
            //如果以前已经编译过了，就把上一次的hash值和ok发给客户端
            if(this._stats){
                socket.emit('hash',this._stats.hash);
                socket.emit('ok');
            }
        });

    }
    //todo
    listen(port,host,callback){
        this.server.listen(port,host,callback);
    }
}
module.exports = Server;
/**
this.app.listen(); 
var server = http.createServer(this);
return server.listen.apply(server, arguments);
 */