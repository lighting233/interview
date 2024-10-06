//todo 1. redux
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

//fn4(fn3(fn2(fn1(1))))
const a = compose(fn4, fn3, fn2, fn1);
console.log("%c Line:24 🍞 a", "color:#ea7e5c", a);

console.log(a(1));

function compose(...arrFn) {
  //todo compose没有参数也要返回一个函数
  if (arrFn.length === 0) {
    return (args) => args;
  }
  //todo 如果参数只有一个则返回这个fn就好了
  if (arrFn.length === 1) {
    return arrFn[0];
  }
  return arrFn.reduce((prev, cur) => {
    return (...args) => prev(cur(...args));
  });
}

//todo 2.koa

class App {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  createContext(req, res) {
    // return
  }

  compose(ctx) {
    let index = -1;
    const dispatch = (i) => {
        if(i <= index) {
            return Promise.reject();
        };
        index = i;
        if(i === this.middlewares.length) {
            return Promise.resolve();
        }
        return Promise.resolve(this.middlewares[i](ctx, () => dispatch(i+1)))
    };
    dispatch(0);
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res);

    this.compose(ctx).then(() => {});
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest);
    server.listen(...args);
  }
}

const Koa = require("koa");
const app = new Koa();

// 中间件 1
app.use(async (ctx, next) => {
  console.log("中间件 1: 请求开始");
  await next(); // 调用下一个中间件
  console.log("中间件 1: 响应结束");
});

// 中间件 2
app.use(async (ctx, next) => {
  console.log("中间件 2: 请求开始");
  await next(); // 调用下一个中间件
  console.log("中间件 2: 响应结束");
});

// 中间件 3
app.use(async (ctx) => {
  console.log("中间件 3: 处理请求");
  ctx.body = "Hello, Koa!"; // 设置响应体
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器正在运行，访问 http://localhost:3000");
});

/**
 * 中间件 1: 请求开始
 * 中间件 2: 请求开始
 * 中间件 3: 处理请求
 * 中间件 2: 响应结束
 * 中间件 1: 响应结束
 */
