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
    listening(eventName, callback, once) {
        if (!this.listeners[eventName]) {
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
        if (this.listeners[eventName]) {
            const index = this.listeners[eventName].indexOf(listener);
            if (index !== -1) {
                this.listeners[eventName].splice(index, 1)
            }
        }
    }
    publish(eventName, ...args) {
        if (this.listeners[eventName]) {
            const listeners = this.listeners[eventName].slice();
            for (let listener of listeners) {
                listener.callback(...args);

                if (listener.once) {
                    this.unlistening(eventName, listener)
                }
            }
        }
    }
}

function SubType(name) {
    SuperType.call(this, name)
    extends (child, parent);
}

function(child, parent) {
    Object.setPrototypeOf(child, parent);
    let prototype = Object.create(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

function create(prototype) {
    function F() { };
    F.prototype = prototype;
    return new F();
}

function myNew(constructor, ...args) {
    const newObj = Object.create(constructor.prototype);
    const res = constructor.apply(newObj, args);
    return res instanceof Object ? res : newObj;
}

function myInstanceof(obj, constructorFunc) {
    if (typeof constructorFunc !== 'function') {
        throw new Error('')
    }
    if (typeof obj === null || typeof obj !== 'object' || typeof obj !== 'function') {
        return false;
    }
    const prototype = constructorFunc.prototype;
    let currentPrototype = Object.getPrototypeOf(obj);
    while (currentPrototype !== null) {
        if (currentPrototype === prototype) {
            return true;
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
    return false;
}

Array.prototype.map = function (cb, ctx) {
    ctx = ctx || window;
    const res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(cb.call(ctx, this[i], i, this))
    }
    return res;
}

Array.prototype.filter = function (callback, context) {
    if (typeof callback !== 'function') {

    };
    context = context || window;
    const res = [];
    for (let i = 0; i < this.length; i++) {
        const item = callback.call(context, this[i], i, this);
        if (item) {
            res.push(this[i])
        }
    }
    return res;
}

Array.prototype.map = function (cb, ctx) {
    ctx = ctx || window;
    return this.reduce((prev, cur, index, array) => {
        return prev.concat(cb.call(ctx, cur, index, array))
    }, [])
}

function compose(...func) {
    if (func.length === 0) {
        return (arg) => arg
    }
    if (func.length === 1) {
        return func[0];
    };

    return func.reduce((prev, cur) => {
        return (...args) => {
            return prev(cur(...args))
        }
    })
}

class Koa {
    compose(ctx) {
        let index = -1;
        const dispatch = (i) => {
            if (i <= index) {
                Promise.reject(new Error('next() called multiple times'))
            }
            index = i;
            if (this.middleware.length === i) {
                return Promise.resolve();
            }
            return Promise.resolve(this.middleware[0](ctx, () => dispatch(i + 1)))
        }
        dispatch(0)
    }
}
let a = {
    b: a
}

const traversType = ['[Object Object]', '[Object Array]', '[Object Map]', '[Object Set]', '[Object Arguments]',];
function deepClone(obj, clonedObj = new WeekMap()) {
    if (clonedObj.has(obj)) {
        return clonedObj.get(obj);
    }
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    let copyObj;
    const objType = getType(obj);
    if (traversType.includes(objType)) {
        clonedObj = new obj.constructor();
        clonedObj.set(obj, clonedObj);
    } else {
        return cloneOthers(obj, objType);
    };
    if (objType === '[Object Map]') {
        obj.forEach((val, key) => {
            copyObj.set(key, deepClone(val, clonedObj));
        })
    }
    if (objType === '[Object Set]') {
        obj.forEach((val) => {
            copyObj.add(deepClone(val, clonedObj));
        })
    }
    for (let key in obj) {
        if (obj.hasOwnproperty(key)) {
            obj[key] = deepClone(obj[key], clonedObj)
        }
    }

    return copyObj;
}

function getType(obj) {
    return Object.prototype.toString.call(obj);
}

function cloneOthers(obj, objType) {
    switch (objType) {
        case '[Object Number]':
        case '[Object String]':
        case '[Object Boolean]':
        case '[Object Error]':
        case '[Object Date]':
            return new obj.constructor(obj.valueOf());
        case '[Object Symbol]':
            return Object(obj.valueOf());
        case '[Object Regexp]':
            return copyRegexp(obj);
    }
}
function copyRegexp(obj) {
    const { source, flags, lastIndex } = obj;
    const copyReg = new RegEXP(source, flags);
    copyReg.lastIndex = lastIndex;
    return copyReg;
}

const promise = new Promise((resolve, reject) => {

}).then((data) => { }, (error) => { })

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new Error(''))
    };
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, (value) => resolvePromise(promise2, value, resolve, reject), (reason) => reject(reason))
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error)
        }
    } else {
        resolve(x);
    }
}
class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.state === PENDING) {
                this.value = value;
                this.state = FULFILLED;
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        }
        const reject = (reason) => {
            if (this.state === PENDING) {
                this.reason = reason;
                this.state = REJECTED;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (e) => { throw e };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        });

        return promise2;
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new Promise((resolve, rejcet) => {
            reject(reason)
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const res = [];
            let times = 0;
            const proccessSuccess = (idx, val) => {
                res[idx] = val;
                times++;
                if (times === len) {
                    resolve(res);
                }
            }
            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        proccessSuccess(i, v)
                    }, (r) => {
                        reject(r)
                    })
                } else {
                    proccessSuccess(i, p)
                }
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        resolve(v)
                    }, (r) => {
                        reject(r)
                    })
                } else {
                    resolve(p)
                }
            }
        })
    }

    static any(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const result = [];
            let times = 0;
            const processError = (idx, reason) => {
                result[idx] = reason;
                if (++times === len) {
                    reject(result);
                }
            }
            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        resolve(v)
                    }, (r) => {
                        processError(i, r)
                    })
                } else {
                    resolve(p)
                }
            }
        })
    }

    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            let times = 0;
            const result = [];
            const processSucessOrError = (idx, val, status) => {
                result[idx] = {
                    status,
                    [status === 'fulfilled' ? 'value' : 'reason']: val
                }
                if (++times === len) {
                    resolve(result);
                }
            };

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        processSucessOrError(i, v, 'fulfilled')
                    }, (r) => {
                        processError(i, r, 'rejected')
                    })
                } else {
                    processSucessOrError(i, p, 'fulfilled')
                }
            }

        })
    }

    catch(fn) {
        return this.then(null, fn)
    }

    finally(cb) {
        return this.then((v) => {
            return Promise.resolve(cb()).then(() => v)
        }, (r) => {
            return Promise.resolve(cb()).then(() => { throw r })
        })
    }



}


new Promise((resolve, reject) => {
    resolve('123')
}).finally((dara) => {
    console.log("%c Line:484 🍤 dara", "color:#b03734", dara);

}).then((value) => {
    console.log("%c Line:487 🧀 value", "color:#93c0a4", value);

})


function compose(...fn) {
    if (fn.length === 0) {
        return (arg) => arg;
    }
    if(fn.length === 0) {
        return fn[0];
    }

    return fn.reduce((prev,cur) => {
        return (...args) => {
            return prev(cur(...args))
        }
    })


}

function currying(fn) {
    return function curried(...args) {
        if(fn.length === args,length) {
            return fn(...args);
        }else {
            return (...moreArgs) => {
                return curried(...[...args,...moreArgs])
            }
        }
    }
}

function myCreate(prototype) {
    function F(){};
    F.prototype = prototype;
    return new F();
}

function myNew(constructor,...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj,args);
    return res instanceof Object ? res : obj;

}



function Child(name) {
    extends(Child,SuperType);
    SuperType.call(this,name);
}

fucntion extends(sub, sup) {
    Object.setPrototypeOf(sub,sup);
    const prototype = Object.create(sup.prototype);
    prototype.constructor = sub;
    sub.protytype = prototype;
}

function debounce(fn,delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        setTimeout(() =>{
            fn.applay(this,args);
        })
    }
}

function throttle(fn,delay,options) {
    const { leading = false, trailing = true } = options;
    let prevTime = 0;
    let timer;

    return function(...args) {
        const currentTime = Date.now();
        if(leading && currentTime - prevTime > delay) {
            prevTime = currentTime;
            fn.apply(this,args);
        }else if(!timer) {
            if(trailing) {
                timer = setTimeout(() => {
                    prevTime = currentTime;
                    fn.apply(this,args);
                    timer = null;
                })
            }
        }
    }
}