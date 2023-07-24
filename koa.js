const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const Stream = require('stream')
const EventEmitter = require('events');

class Application extends EventEmitter{
    constructor() {
        super(); // EventEmiiter.call(this);
        this.context = Object.create(context); //  实现每次创建一个应用都有自己的全新上下文
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = [];
    }
    use(middleware) {
        // 保存用户写的函数
        this.middlewares.push(middleware);
    }
    createContext(req, res) {
        let ctx = Object.create(this.context); // 这个目的是为了每次请求的时候 都拥有自己的上下文，而且自己的上下文是可以获取公共上下文声明的变量、属性
        let request = Object.create(this.request);
        let response = Object.create(this.response);


        ctx.request = request; // 上下文中包含着request
        ctx.req = ctx.request.req = req; // 默认上下文中包含着 原生的req

        ctx.response = response;
        ctx.res = ctx.response.res = res; // 这个的目的和request的含义是一致的，就是可以在我们的response对象中 通过this.res 拿到原生res

        return ctx;
    }
    compose(ctx) {
        // 组合是要将 数组里的函数 一个个执行
        let index = -1;
        const dispatch = (i) => {
            // 如果没有中间件 直接成功即可
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i;
            if (this.middlewares.length === i) return Promise.resolve();
            //                                                这个函数是next函数
            // 一个promise 在执行的时候 会等待返回的promise执行完毕

            // () => dispatch(1)
            // () => dispatch(1)
            return Promise.resolve(this.middlewares[i](ctx, () => dispatch(i + 1)))
        }
        return dispatch(0);

    }
    handleRequest = (req, res) => { // 每次请求都会执行此方法
        let ctx = this.createContext(req, res);
        res.statusCode = 404;
        // this.fn(ctx);

        this.compose(ctx).then(() => {
            let _body = ctx.body;
            if (_body) {
                if (typeof _body === 'string' || Buffer.isBuffer(_body)) {
                    return res.end(_body);
                } else if (typeof _body === 'number') {
                    return res.end(_body + '');
                } else if (_body instanceof Stream) {
                    // 可以设置成下载头 
                    //res.setHeader('Content-Type','application/octet-stream');
                    // 设置不识别的header 也会变成下载文件，设置对了才行
                    // res.setHeader('Content-Disposition','attachment;filename=FileName.txt');
                    return _body.pipe(res);
                } else if (typeof _body == 'object') {
                    return res.end(JSON.stringify(_body));
                }
            } else {
                res.end(`Not Found`)
            }
        }).catch((err)=>{
            this.emit('error',err);
        })
    }
    listen(...args) {
        const server = http.createServer(this.handleRequest);
        server.listen(...args);
    }
}
module.exports = Application




// function create(proto){
//     function Fn(){}  构建一个空的函数 用于存放传入的原型
//     Fn.prototype = proto;
//     return new Fn()
// }

class App {
    this.middlewares = [];

    use(middleware) {
        this.middlewares.push(middleware)
    }

    createContext(req,res) {
        //return ctx
    }

    compose(ctx) {
        let index = -1;
        const dispatch = (i) = {
            if(i <= index) {
                return Promise.reject()
            }
            index = i
            if(this.middlewares.length === index) {
                return Promise.resolve()
            }
            return Promise.resolve(this.middlewares[i](ctx, () => dispatch(i+1)))
        }
        return dispatch(0)
    }

    handleRequest(req,res) {
        const ctx = this.createContext(req,res)

        this.compose(ctx).then(() => {

        })
    }

    listen(..args) {
        const server = http.createServer(this.handleRequest);
        server.listen(...args)
    }
}

function fn1(x) {
    return x + 1;
  }
  function fn2(x) {
    return x + 2;
  }
  function fn3(x) {
    return x + 3;
  }
  function fn4(x) {
    return x + 4;
  }

  //redux中间件
  function compose(...fn) {
    if(!fn.length) {
        return (arg) => arg
    }
    if(fn.length === 1) {
        return fn[0]
    }

    return fn.reduce((pre,cur) => {
        console.log("%c Line:159 🥒 cur", "color:#b03734", cur);
        console.log("%c Line:159 🥟 pre", "color:#3f7cff", pre);
      return (...args) => {
        return pre(cur(...args))
      }
    })
  }

  //fn4(fn3(fn2(fn1(1))))
  const a = compose(fn4, fn3, fn2, fn1);
  console.log("%c Line:24 🍞 a", "color:#ea7e5c", a);

  console.log(a(1));