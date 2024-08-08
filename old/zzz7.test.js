const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('123'))
    };

    if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        try {
            const then = x.then;
            if (then && typeof then === 'function') {
                then.call(x, (value) => {
                    resolvePromise(promise2, value, resolve, reject)
                }, (error) => {
                    reject(error)
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
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
        //todo onResolvedCallbacks
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof Promise) {
                //todo 忘了 resolve reject
                return value.then(resolve, reject);
            }
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach((fn) => fn());
            }
        }

        const reject = (reason) => {
            this.state = REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach((fn) => fn());
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
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
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
                //todo 忘了 0
            };

            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                       const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            };

            if (this.state === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })

                this.onRejectedCallbacks(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })
            };
        });

        return promise2;
    }

    catch(errorFn) {
        return this.then(null, errorFn);
    }

    finally(cb) {
        return this.then((value) => {
            //todo Promise.resolve
            return Promise.resolve(cb()).then(() => value)
        }, (reason) => {
            //todo 忘了 throw
            return Promise.resolve((cb()).then(() => { throw reason })
        })
    }

    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let len = promises.length;
            const result = [];
            let times = 0;

            const processSucess = (idx, value) => {
                result[idx] = p;
                times++;
                if (times === len) {
                    resolve(result);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];

                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucess(i, value)
                    }, (reason) => {
                        reject(reason)
                    })
                } else {
                    processSucess(i, p)
                }
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            let len = promises.length;

            for (let i = 0; i < len; i++) {
                const p = promises[i];

                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        resolve(value)
                    }, (reason) => {
                        reject(reason)
                    })
                } else {
                    resolve(p)
                }
            }
        })
    }

    static any(promises) {
        return new Promise((resolve, reject) => {
            let len = promises.length;
            const result = [];
            let times = 0;

            const processError = (idx, value) => {
                result[idx] = p;
                times++;
                if (times === len) {
                    reject(result);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];

                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        resolve(value)
                    }, (reason) => {
                        processError(i, reason)
                    })
                } else {
                    resolve(p)
                }
            }
        })
    }

    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            let len = promises.length;
            const result = [];
            let times = 0;

            const processSucessOrError = (idx, value, type) => {
                result[idx] = {
                    status: type,
                    [type === 'onfulfilled' : 'value' : 'reason']: value
                };
                times++;
                if (times === len) {
                    resolve(result);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];

                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucessOrError(i, value)
                    }, (reason) => {
                        processSucessOrError(reason)
                    })
                } else {
                    processSucessOrError(i, p,)
                }
            }
        })
    }
}

function promiseAllWithLimit(promises, limit) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        let running = 0;
        const result = [];
        let index = 0;

        function run() {
            if (index >= len && running === 0) {
                return resolve(result);
            }

            while (running < limit && idnex < len) {
                const currentIndex = index;
                index++;
                running++;

                promises[currentIndex].then((value) => {
                    result[currentIndex] = value;
                }, (reason) => {
                    reject(reason)
                }).finally(() => {
                    running--;
                    run();
                })
            }
        }
        run();
    })
}

const request1 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });

const request2 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 500);
    });
const request3 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 300);
    });
const request4 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(4);
        }, 400);
    });

//实现一个 scheduler 函数，满足以下要求：

//1.接收一个参数 max 控制最大并发请求量
//2.执行以下代码依次输出：2、3、1、4

const addRequest = scheduler(2);
addRequest(request1).then(res => {
    console.log(res);
});
addRequest(request2).then(res => {
    console.log(res);
});
addRequest(request3).then(res => {
    console.log(res);
});
addRequest(request4).then(res => {
    console.log(res);
});

function scheduler(limit) {
    const queue = [];
    let running = 0;
    return function (request) {

        const run = () => {
            while (running < limit && queue.length) {
                //todo shift
                const reqFunc = queue.shift();
                running++;
                //todo reqFunc()
                reqFunc().then((value) => {
                    reqFunc.resolve(value);
                }).finally(() => {
                    running--;
                    run();
                })
            }
        }

        //todo new Promise
        return new Promise((resolve, reject) => {
            request.resolve = resolve;
            queue.push(request);
            run()
        })
    }
}

function debounce(fn, delay, immediate) {
    let timer;

    return function (...args) {
        const context = this;
        //todo
        if (timer) clearTimeout(timer);
        if (immediate && !timer) {
            fn.apply(context, args);
        }
        timer = setTimeout(() => {
            if (!immediate) {
                fn.apply(context, args);
            }
            timer = null;
        }, delay)
    }
}

function throttle(fn, delay, options) {
    let prevTime = 0;
    let timer;
    const { leading = false, tariling = true } = options;

    return function (...args) {
        let currentTime = Date.now();
        const context = this;
        if (leading && currentTime - prevTime >= delay) {
            fn.apply(context, args);
            prevTime = currentTime;
            //todo
        } else if (!timer && tariling) {
            setTimeout(() => {
                fn.apply(context, args);
                //todo
                prevTime = currentTime;
                //todo
                timer = null;
            }, delay)
        }
    }
}

Function.prototype.apply = function (context, args = []) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;

    const res = context[symbolKey](...args);
    delete context[symbolKey];
    return res;
}

Function.prototype.call = function (context, ...args) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;

    const res = context[symbolKey](...args);
    delete context[symbolKey];
    return res;
}

Function.prototype.bind = function (context, ...args) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;

    return function (...moreArgs) {
        const res = context[symbolKey](...[...args,...moreArgs]);
        delete context[symbolKey];
        return res;
    }
}

function getType(obj) {
    return Object.prototype.toString.call(obj)
}

const travelType = ['[object Object]', '[object Array]', '[object Map]', '[object Set]', '[object Arguments]',]

function cloneOthers(obj, type) {
    switch (type) {
        case '[object Number]':
        case '[object Srting]':
        case '[object Booblean]':
            return new obj.constructor(obj.valueOf())
        case '[object Symbol]':
        case '[object BigInt]':
            return Object(obj.valueOf());
        case '[object Regexp]':
            return copyReg(obj):
    }
}

function copyReg(obj) {
    //todo source
    const { source, lastIndex, flags } = obj;
    const res = new RegExp(source, flags);
    res.lastIndex = lastIndex;
    return res;
}

function deepClone(obj, clonedObj = new WeekMap()) {
    if (clonedObj.has(obj)) {
        return clonedObj.get(obj)
    }

    //todo 没有function
    if (typeof obj === null || typeof obj !== 'object') {
        return obj;
    }

    let copyObj;
    const type = getType(obj);
    if (travelType.includes(type)) {
        copyObj = new obj.constructor();
        clonedObj.set(obj, copyObj);
    } else {
        return cloneOthers(obj, type)
    }

    if (type === '[object Set]') {
        //todo val
        obj.forEach((val) => {
            copyObj.add(deepClone(val, clonedObj))
        })
    }

    if (type === '[object Map]') {
        //todo val
        obj.forEach((val, key) => {
            copyObj.set(key, deepClone(val, clonedObj))
        })
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepClone(obj[key], clonedObj)
        }
    }


    return copyObj;
}

function CustomNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}

function myCreate(prototype) {
    function F() { };
    F.prototype = prototype;
    return new F();
}

function myInstanceOf(obj, constructor) {
    //todo
    if (typeof constructor !== 'function') {
        return throw new TypeError('')
    }

    //todo return false
    if (typeof obj !== 'object' || typeof obj !== 'function' || typeof === null) {
        return false;
    }

    let currentPrototype = Object.getPrototypeOf(obj);
    const constructorPrototype = constructor.prototype;

    //todo !== null
    while (currentPrototype !== null) {
        if (currentPrototype === constructorPrototype) {
            return true;
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    return false;
}

function Super(name) {

}

//参数
extends (subType, superType) {
    Object.setPrototypeOf(subType, subType)
    //prototype
    const prototype = Object.create(superType.prototype);
    //todo subType
    prototype.constructor = subType;
    //todo 指定对象 
    subType.prototype = prototype
}

function Sub(name, age) {
    //todo this,参数
    Super.call(this, name)
    extends (Sub, Super)
}

function quickSort(arr) {
    if (arr.length < 2) return arr;
    const len = arr.length;
    const midIdx = Math.floor(len / 2);
    let midVal = arr.splice(midIdx, 1)[0];

    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < midVal) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([midVal], quickSort(right))
}
let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];
function flat(arr) {
    const res = [];
    //todo
    const stack = [..arr]
    while (stack.length) {
        const node = arr.pop();
        //todo Array.isArray
        if (Array.isArray(node)) {
            res.push(...node)
        } else {
            res.unshift(node)
        }
    }
    return res;
}

function flay(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flag(cur) : cur)
    }, [])
}

class LazyLog {
    constructor() {
        this.queue = []
    }

    log(nums) {

        //todo return this
        this.queue.push(() => {
            console.log(num)
        })
        return this;
    }

    sleep(delay) {
        this.queue.push(new Promise((resolve, reject) => {
            setTimeout(resolve, delay)
        }))

        return this
    }
    //todo async
    async executor() {
        //todo for of
        for(let task of this.queue) {
            if(typeof task === 'function') {
                task();
                //todo instanceof
            }else if(task instanceof Promise) {
                //todo await
                await task();
            }
        }
    }
}

sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {
    //todo const f
    const f = (...newArgs) => sum(...args.concat(newArgs));
    //todo f.sum    args.reduce
    f.sum = () => args.reduce((prev,cur) => prev + cur,0)

    //todo return f
    return f;
}

function currying(fn) {
    return function curried(...args) {
        if(args.length >= fn.length) {
            return fn(...args);
        }else {
            return function(...moreArgs) {
                return curried(...[...args,...moreArgs])
            }
        }
    }
}

class EventBus {
    constructor() {
        this.subScribtion = {};
    }

    subScribe(typeName, callback, once = false) {
        if(!this.subScribtion[typeName]) {
            this.subScribtion[typeName] = []
        }
        const listener = {
            callback,
            once
        }
        this.subScribtion[typeName].push(listener);

        return () => {
            this.unSubScribe(typeName,listener)
        }
    }

    unSubScribe(typeName,listener) {
        if(this.subScribtion[typeName]) {
            const idx = this.subScribtion[typeName].indexOf(listener);
            //todo -1
            if(idx !== -1) {
                this.subScribtion[typeName].splice(idx,1)
            }
            
        }
    }

    //todo args
    publish(typeName, ...args) {
        if(this.subScribtion[typeName]) {
            const subscribers = this.subScribtion[typeName].slice();
            //todo for of
            for(let listener of subscribers) {
                listener.callback(...args);

                if(listener.once) {
                    this.unSubScribe(typeName,listener)
                }
            }
        }
    }
}

function compose(...func) {
    if(func.length === 0) return (v) => v;
    //todo func[0]
    if(func.length === 1) return func[0];

    //todo 写反了
    return func.reduce((prev,cur)) => {
        return (...args) => {
            return prev(cur(...args))
        }
    }

}

const cityName = customGet(obj, 'user.address.city', 'Unknown');
console.log(cityName); // 输出：New York

const nonExistentProp = customGet(obj, 'user.age', 'N/A');
console.log(nonExistentProp); // 输出：N/A

function customGet(source,path,defaultValue) {
    if(Array.isArray(path) && path.length === 0) {
        return defaultValue
    }

    if(typeof path === 'string' && path.trim().length === 0) {
        return defaultValue;
    }

    path = Array.isArray(path) ? path : path.split('.');

    const res = path.reduce((prev,cur) => {
        return (prev || {})[cur]
    },source)

    return res !== undefined ? res : defaultValue;
}

fn([1, 2, 3, 4, 5], 2); //结果为[[1,2],[3,4],[5]]

function fn(arr,size) {
    const res = []
    //todo +=size
    for(let i = 0; i < arr.length; i+=size) {
        //todo slice
        res.push(arr.slice(i, i+ size))
    }
    return res;
}