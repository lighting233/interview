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

function compose(...funcArr) {
    //todo
    if(funcArr.length === 0) return (...args) => args;
    if(funcArr.length === 1) return funcArr[0] 
    return funcArr.reduce((prev, cur) => {
        return (...args) => {
            return prev(cur(...args))
        }
    })
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
        let idx = -1;
        const dispatch = (i) => {
            if(i <= idx) {
                return Promise.reject();
            }
            idx = i;
            if(i === this.middlewares.length) {
                return Promise.resolve();
            };
            
            //todo 
            // return Promise.resolve(this.middlewares[0](ctx, dispatch(i+1)))
            return Promise.resolve(this.middlewares[0](ctx, () => dispatch(i+1)))
        };
        dispatch(0)
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