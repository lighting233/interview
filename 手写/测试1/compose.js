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

function compose(...func) {
    //todo
    if (func.length === 0) return (...args) => args;
    if (func.length === 1) return func[0];
    return func.reduce((prev, cur) => {
        return (..args) => {
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

    }

    handleRequest(req, res) {
        const ctx = this.createContext(req, res)

        this.compose(ctx).then(() => {
            let index = -1;
            const dispatch = (i) => {
                if(i <= index) {
                    //todo
                    // thorw new Error('xxx');
                    return Promise.reject();
                };
                index = i;
                if(i === this.middlewares.length) {
                    return Promise.resolve();
                };
                //todo
                // return Promise.resolve(this.middlewares[i](() => dispatch(++i)))
                return Promise.resolve(this.middlewares[i](ctx, () => dispatch(i + 1)))
            };
            dispatch(0);
        })
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest);
        server.listen(...args)
    }
}