function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}

function myCreate(prototype) {
    function F() { };
    F.prototype = prototype;
    return new F();
}

Function.prototype.myApply = function (context, args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;
    try {
        const res = context[uniqueID](...args);
    } catch (e) {
        throw new Error(e);
    } finally {
        delete context[uniqueID];
    }
    return res;
}

Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;
    try {
        const res = context[uniqueID](...args);
    } catch (e) {
        throw new Error(e);
    } finally {
        delete context[uniqueID];
    }
    return res;
}

Function.prototype.myBind = function (content,..args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    return (...innerArgs) => {
        try {
            const res = context[uniqueID](...args);
        } catch (e) {
            throw new Error(e);
        } finally {
            delete context[uniqueID];
        }
        return res;
    }
}

function extends (child, _super) {
    Object.setPrtotypeOf(child, _super);
    Function() {
        this.conctructor = child;
    }
    F.prototype = _super.prototype;
    child.prototype = new F();
}

var Student = (function (_super) {
    extends (Stunent, _super);
function Student(name) {
    var _this = _super.call(this, name) || this;
    _this.name = name;
    return _this;
}
Student.prototype.sayName = function () {
    console.log(this.name);
}
return Student;
}(Parent))


function myInstanceof(instance, conctructor) {
    if (typeof instance !== 'object' || typeof instance === 'null' || typeof instance !== 'function') {
        return false
    }
    if (typeof conctructor !== 'function') {
        throw new Error('....')
    }
    const prototypeOfConstructor = conctructor.prototype;
    let currentPrototype = Object.getPrototypeOf(instance);
    while (currentPrototype) {
        if (currentPrototype === prototypeOfConstructor) {
            return true;
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
    return false;
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function throttle(fn, delay, options) {
    let prevTimes = 0;
    let timer;
    let { leading = true, trailing = true } = options;

    return function (...args) {
        let currentTimes = Date.now();
        if (leading && currentTimes - prevTimes >= delay) {
            prevTimes = currentTimes;
            fn.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                if (trailing) {
                    prevTimes = currentTimes;
                    fn.apply(this.args);
                    timer = null;
                }
            }, delay)
        }
    }
}

function Module(id) {
    this.id = id;
    this.exports = {};
}
Module._cache = {};
Module._resolveFileName = function (filename) {

}
Module.prototype.load = function () {
    let ext = path.extname(this.id); // 获取文件后缀名
    Module._extensions[ext](this);
}
Module._extensions = {
    '.js'(module) {
        let script = fs.readFileSync(module.id, 'utf8');
        let templateFn = `(function(exports,module,require,__dirname,__filename){${script}})`;
        let fn = vm.runInThisContext(templateFn);
        let exports = module.exports;
        let thisValue = exports; // this = module.exports = exports;
        let filename = module.id;
        let dirname = path.dirname(filename);

        // 函数的call 的作用 1.改变this指向 2.让函数指向
        fn.call(thisValue, exports, module, req, dirname, filename); // 调用了a模块 module.exports = 100;

        const script = fs.readFileSync(module.id, 'utf-8');
        const templateFn = `(function(exports,module,require,__dirname,__failename){${script}})`;
        const fn = vm.runInThisContext(templateFn);
        const exports = module.exports;
        const thisValue = exports;
        const filename = module.id;
        const dirname = path.dirname(filename);
        fn.call(thisValue, exports, module, req, dirname, filename);
    },
    '.json'(module) {
        let script = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(script)
    }
}
function req(filename) {
    filename = Moudle._resolveFileName(filename);
    const cacheModule = Module._cache[filename];
    if (cacheModule) {
        return cacheModule.exports;
    }
    const module = new Module(filename);
    module.load();
    return module.exports;
}

class Koa {
    constructor() {
        this.middewears = [];
    }

    use(middewear) {
        this.middewears.push(middewear);
    }

    createContext(req, res) {

    }

    compose(ctx) {
        let index = -1;

        const dispatch => (i) {

            if (i <= index) {
                return Promise.reject();
            }
            index = i;
            if (this.middewears.length === i) {
                return Promise.resolve();
            }

            return Promise.resolve(this.middewears[i](ctx, () => dispatch(i + 1)))
        };

        dispatch(0);
    }

    hadleRequest(req, res) {
        const context = createContext(req, res);
        this.compose(context).then(() => {
        })
    }

    listen(...args) {
        const server = http.creatServer(this.hadleRequest);
        server.listen(...args);
    }

}

function compose(...fn) {
    if (fn.length === 0) {
        return (arg) => arg;
    }

    if (fn.length === 1) {
        return fn[0];
    }

    return fn.reduce((prev, cur) => {
        return (...args) => {
            return prev(cur(...args))
        }
    })
}

function curry(func) {
    return function curried(...args) {
        if (func.length >= args.length) {
            return func(...args);
        } else {
            return function (...moreArgs) {
                return curried(...[...args, ...moreArgs])
            }
        }
    }
}

class EventBus {
    constructor() {
        this.events = {};
    }
    subscribe(eventName, callback, once) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        const subscription = { callback, once };
        this.events[eventName].push(subscription);

        return () => {
            this.unSubscribe(eventName, subscription);
        }
    }

    unSubscribe(eventName, subscription) {
        if (this.events[eventName]) {
            const index = this.events[eventName].indexOf(subscription);
            if (index !== -1) {
                this.events[eventName].splice(index, 1);
            }
        }
    }

    publish(eventName, ...args) {
        if (this.events[eventName]) {
            const subscribers = this.events[eventName].slice();

            for (const subscription of subscribers) {
                subscription.callback(...args);

                if (subscription.once) {
                    this.unSubscribe(eventName, subscription)
                }
            }
        }
    }
}

const traversType = [
    '[Object Object]', '[Object Array]', '[Object Set]', '[Object Map]', '[Object Arguments]'
]

function cloneOtherType(obj, objType) {
    switch (objType) {
        case '[Object Number]':
        case '[Object String]':
        case '[Object Bolean]':
        case '[Object Error]':
        case '[Object Date]':
            return new obj.conctructor(obj.valueOf());
        case '[Object Symbol]':
            return Object(obj.valueOf());
        case '[Object Regexp]':
            return copyRegExp(obj);

    }
}

function copyRegexp(obj) {
    const { source, flag, lastIndex } = obj;
    const copyObj = new RegExp(source, flag);
    copyObj.lastIndex = lastIndex;
    return copyObj;
}

function deepClone(obj, clonedObj = new WeekMap()) {
    if (clonedObj.has(obj)) {
        return clonedObj.get(obj);
    }
    if (typeof obj === null || typeof obj !== 'object') {
        return obj;
    }
    const objType = Object.prototype.toString.call(obj);

    let copyObj;
    if (traversType.includes(objType)) {
        copyObj = new obj.conctructor();
        clonedObj.set(obj, copyObj)
    } else {
        return cloneOtherType(obj);
    }

    if (objType === '[Object Set]') {
        obj.forEach((val) => {
            copyObj.add(deepClone(val, clonedObj))
        })
        return copyObj;
    }

    if (objType === '[Object Map]') {
        obj.forEach((val, key) => {
            copyObj.set(key, deepClone(val, clonedObj))
        })
        return copyObj;
    }

    for (let key in obj) {
        if (Object.hasOwnPrototypeOf(key)) {
            copyObj[key] = deepClone(obj[key], clonedObj);
        }
    }

    return copyObj;
}

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(x, promise2, resolev, reject) {
    if (x === promise2) {
        return reject(new ErrorType('123'))
    }
    if ((typeof x === 'object' && typeof !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (v) => {
                    resolvePromise(v, promise2, resolev, reject)
                }, (r) => {
                    reject(r);
                })
            } else {
                resolve(x)
            }
        } catch (r) {
            reject(r)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.vlaue = undefined;
        this.reason = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {
            if (this.state === PENDING) {
                this.value = value;
                this.onResolvedCallback.forEach((fn) => fn())
            }
        }

        const reject = (reason) => {
            if (this.state === REJECTED) {
                this.reason = reason;
                this.onRejectedCallback.forEach((fn) => fn())
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (r) {
                        reject(r);
                    }
                }, 0)
            }

            if (this.state === PENDING) {
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (r) {
                            reject(r);
                        }
                    }, 0)
                })

            }
        })
        return promise2;
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    catch(func) {
        return this.then(null, func)
    }

    finally(cb) {
        return this.then((value) => {
            return Promise.resolve(cb()).then(() => value)
        }, (reason) => {
            return Promise.resolve(cb()).then(() => throw reason)
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            const res = [];
            let len = promises.length;
            let times = 0;
            const processSucess = (value, idx) => {
                res[idx] = value;
                if (++times === len) {
                    resolve(res);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucess(value, i);
                    }, (reason) => {
                        reject(reason);
                    })
                } else {
                    processSucess(p, i);
                }
            }
        })
    }

    static any(promises) {
        return new Promise((resolve, reject) => {
            const res = [];
            let len = promises.length;
            if (len === 0) {
                reject('123')
            }
            let times = 0;
            const processError = (value, idx) => {
                res[idx] = value;
                if (++times === len) {
                    reject(res);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        resolve(value)
                    }, (reason) => {
                        processError(reason, i);
                    })
                } else {
                    resolve(p)
                }
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            const res = [];
            let len = promises.length;

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then(resolve, reject)
                } else {
                    resolve(p)
                }
            }
        })
    }

    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const res = [];
            let times = 0;
            const processSucessOrError = (idx, value, type) => {
                res[idx] = { status: type, [type === 'fulfilled' ? 'value' : 'reason']: value };;
                if (++times === len) {
                    resolve(res)
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && p.then) {
                    p.then((value) => {
                        processSucessOrError(i, value, 'fulfilled')
                    }, (reason) => {
                        processSucessOrError(i, reason, 'rejected')
                    })
                } else {
                    processSucessOrError(i, p, 'fulfilled')
                }
            }
        })
    }
}
