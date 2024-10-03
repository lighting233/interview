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
};

//fn4(fn3(fn2(fn1(1))))
const a = compose(fn4, fn3, fn2, fn1);
console.log("%c Line:24 🍞 a", "color:#ea7e5c", a);

console.log(a(1));

function compose() {
   
};

//todo 2.koa

class App {
    constructor() {
        this.middlewares = [];
    }


    use(middleware) {
        this.middlewares.push(middleware)
    }

    createContext(req, res) {
        // return 
    }

    compose(ctx) {
        
    }

    handleRequest(req, res) {
        const ctx = this.createContext(req, res)

        this.compose(ctx).then(() => {

        })
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest);
        server.listen(...args)
    }
}