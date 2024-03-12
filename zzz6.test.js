Function.prototype.myApply = function (ctx, args = []) {
    ctx = ctx || window;
    const symbolKey = Symbol();
    ctx[symbolKey] = this;
    const res = ctx[symbolKey](...args)
    delete ctx[symbolKey];
    return res;
}
Function.prototype.myCall = function (ctx, ...args) {
    ctx = ctx || window;
    const symbolKey = Symbol();
    ctx[symbolKey] = this;
    const res = ctx[symbolKey](...args);
    delete ctx[symbolKey];
    return res;
}

Function.prototype.myBind = function (ctx, ...args) {
    ctx = ctx || window;
    const symbolKey = Symbol();
    ctx[symbolKey] = this;

    return function (...innerArgs) {
        const res = ctx[symbolKey](...args, ...innerArgs);
        delete ctx[symbolKey];
        return res;
    }
}

// 示例用法
const flatArray = [
    { id: 1, name: 'Node 1', parentId: null },
    { id: 2, name: 'Node 1.1', parentId: 1 },
    { id: 3, name: 'Node 1.2', parentId: 1 },
    { id: 4, name: 'Node 2', parentId: null },
    { id: 5, name: 'Node 2.1', parentId: 4 },
];

function arrayToTree(arr = []) {
    const res = [];
    const map = {};
    arr.forEach((item) => {
        map[item.id] = { ...item, children: [] }
    });
    for (let itemID in map) {
        if (map.hasOwnProperty(itemID)) {
            const item = map[itemID];
            const parentID = item.parentID;
            if (parentID) {
                if (map[parentID]) {
                    map[parentID].children.push(item);
                } else {
                    console.log(id not find)
                }
            } else {
                res.push(item);
            }
        }
    }
    return res;
}

let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];

function flat(arr) {
    const res = [];
    const stack = [...arr];
    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item)
        } else {
            res.unshift(item)
        }
    }
    return res;
}

function flat(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Arrya.isArray(cur) ? flat(cur) : cur)
    }, [])
}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

const add2 = curriedAdd(2);
const add2and3 = add2(3);

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return function (...moreArgs) {
                return curried(...[...args, ...moreArgs])
            }
        }
    }
}

function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function thtottle(fn, delay, options = {}) {
    let { leading = false, trailing = true } = options;
    let timer = null;
    let prevTime = 0;

    return function (...args) {
        const currentTime = Date.now();
        if (leading && currentTime - prevTime > delay) {
            prevTime = currentTime;
            fn.apply(this, args);
        } else if (!timer) {
            if (trailing) {
                timer = setTimeout(() => {
                    prevTime = currentTime;
                    fn.apply(this, args);
                    timer = null;
                }, delay)
            }

        }
    }
}

class EventBus {
    constructor() {
        this.listeners = {};
    }
    listening(eventName,callback, once) {
        if(!this.listeners[eventName]) {
            this.listeners[eventName] = {}
        }
        const listener = {
            callback,
            once
        }
        this.listeners[eventName].push(listener)
        return () => {
            this.unlistening(eventName, listener);
        }
    }
    unlistening(eventName, listener) {
        if(this.listeners[eventName]) {
            const index = this.listeners[eventName].indexOf(listener);
            if(index !== -1) {
                this.listeners[eventName].splice(index,1)
            }
        }
    }
    publish(eventName,...args) {
        if(this.listeners[eventName]) {
            const listeners = this.listeners[eventName].slice();
            for(let listener of listeners) {
                listener.callback(...args);

                if(listener.once) {
                    this.unlistening(eventName,listener)
                }
            }
        }
    }
}

function SubType(name) {
    SuperType.call(this,name)
    extends(child,parent);
}

function(child,parent) {
    Object.setPrototypeOf(child,parent);
    let prototype = Object.create(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

function create(prototype) {
    function F(){};
    F.prototype = prototype;
    return new F();
}

function myNew(constructor,...args) {
    const newObj = Object.create(constructor.prototype);
    const res = constructor.apply(newObj,args);
    return res instanceof Object ? res : newObj;
}

function myInstanceof(obj,constructorFunc) {
    if(typeof constructorFunc !== 'function') {
        throw new Error('')
    }
    if(typeof obj === null || typeof obj !== 'object' || typeof obj !== 'function') {
        return false;
    }
    const prototype = constructorFunc.prototype;
    let currentPrototype = Object.getPrototypeOf(obj);
    while(currentPrototype !== null) {
        if(currentPrototype === prototype) {
            return true;
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
    return false;
}

Array.prototype.map = function(cb,ctx) {
    ctx = ctx || window;
    const res = [];
    for(let i = 0; i < this.length; i++) {
        res.push(cb.call(ctx,this[i],i,this))
    }
    return res;
}

Array.prototype.filter = function(callback,context) {
    if(typeof callback !== 'function') {
        
    };
    context = context || window;
    const res = [];
    for(let i = 0; i < this.length; i++) {
        const item = callback.call(context,this[i],i,this);
        if(item) {
            res.push(this[i])
        }
    }
    return res;
}

Array.prototype.map = function(cb,ctx) {
    ctx = ctx || window;
    return this.reduce((prev,cur,index,array) => {
        return prev.concat(cb.call(ctx,cur,index,array))
    },[])
}

function compose(...func) {
    if(func.length === 0) {
        return (arg) => arg
    }
    if(func.length === 1) {
        return func[0];
    };

    return func.reduce((prev,cur) => {
        return (...args) => {
            return prev(cur(...args))
        }
    })
}

class Koa {
    compose(ctx) {
        let index = -1;
        const dispatch = (i)=>{
            if(i <= index) {
                Promise.reject(new Error('next() called multiple times'))
            }
            index = i;
            if(this.middleware.length === i) {
                return Promise.resolve();
            }
            return Promise.resolve(this.middleware[0](ctx,() => dispatch(i + 1)))
        }
        dispatch(0)
    }
}