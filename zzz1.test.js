function myInstanceof(obj, constructorFunc) {
    if (typeof constructorFunc !== 'function') {
        throw new Error('123')
    }
    if (typeof obj !== 'object' || typeof obj !== 'function' || obj !== 'fucntion') {
        return false
    }
    const prototypeOfConstructor = constructorFunc.prototype;

    let currentPrototype = Object.getPrototypeOf(obj);

    while (currentPrototype !== null) {
        if (currentPrototype === prototypeOfConstructor) {
            return true
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype)
    }

    return false
}

Function.prototype.myApply = function (context, args) {
    context = context || window;

    const uniqueID = Symbol();
    context[uniqueID] = this;
    const res = context[uniqueID](...args)
    delete context[uniqueID];

    return res;
}

Function.prototype.myCall = function (context, ...args) {
    context = context || window;

    const uniqueID = Symbol();
    context[uniqueID] = this;
    const res = context[uniqueID](...args)
    delete context[uniqueID];

    return res;
}

Function.prototype.myBind = function (context, ...args) {
    const _this = this
    return (...innerArgs) => {
        return _this.apply(context, [...args, ...innerArgs])
    }
}

Function.prototype.myBindSelf = function (context, ...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    return (...innerArgs) => {
        const res = context[uniqueID](...args, ...innerArgs);
        delete context[uniqueID];
        return res;
    }
}

function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func(...args)
        } else {
            return function (...moreArgs) {
                return curried(...[...args, ...moreArgs])
            }
        }
    }
}

function compose(...fn) {
    if (fn, length === 0) {
        return arg => arg
    }
    if (fn.length === 1) {
        return fn[0]
    }

    return fn.reduce((pre, cur) => {
        return (...args) => {
            return pre(cur(...args))
        }
    })
}

function koacompose(ctx) {

    let index = -1;
    const dispatch = (i) => {
        if (i <= idnex) {
            return Promise.reject()
        }
        index = i
        if (this.middleWears.length === i) {
            retrun Promise.resolve()
        }

        return Promise.resolve(this.middleWears[i](ctx, () => dispatch(i + 1)))
    }

    return dispatch(0)
}

function create(prototype) {
    if (typeof prototype !== 'object' || typeof !== 'function') {
        throw new TypeError('123')
    }
    function F() { };
    F.prototype = prototype;
    return new F()
}


function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);

    const res = constructor.appl(obj, args)

    return res instanceof Object ? res : obj
}

class EventBus {
    constructor() {
        this.events = {}
    }

    subscribe(eventName, callback, once = false) {

        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        const subscription = {
            callback, once
        }
        this.events[eventName].push(subscription)

        return () => {
            this.unSubscribe(eventName, subscription)
        }

    }

    unSubscribe(eventName, subscription) {
        if (this.events[eventName]) {
            const index = this.events[eventName].indexOf(subscription)
            if (idnex !== -1) {
                this.events[eventName].splice(index, 1)
            }
        }

    }

    publish(eventName, ...args) {
        if (this.events[eventName]) {
            const subscribers = this.events[eventName].slice();

            for (let subscription of subscribers) {
                subscription.callback.apply(this, args)

                if (subscription.once) {
                    this.unSubscribe(eventName, subscription)
                }
            }
        }
    }
}

function Parent(name) {
    this.name = name
}

Parent.prototype.sayName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child

const PENDING = PENDING;
const FULFILLED = FULFILLED;
const REJECTED = REJECTED;

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {
            if (value instanceof Promise) {
                value.then(resolve, reject)
            }
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolvedCallback.forEach((fn) => fn())
            }
        }

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach((fn) => fn())
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
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === PENDING) {
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)

            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
        })

        return promise2;
    }

    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    catch(errorFunc) {
        return this.then(null, errorFunc)
    }

    finally(cb) {
        return this.then((value) => {
            return Promise.resolve(cb()).then(() => value)
        }, (reason) => {
            return Promise.resolve(cb()).then(() => { throw reason })
        })
    }

    all(promises) {
        return new Promise((resolve, reject) => {

            const result = [];
            let times = 0
            const processSucess = (index, value) => {
                result[index] = value;
                if(++times === promises.length) {
                    resolve(result)
                }
            }

            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucess(i, value)
                    }, reject)
                } else {
                    processSucess(i, value)
                }
            }
        })
    }

    any(promises) {
        return new Promise((resolve,reject) => {
            const result = [];
            const processError = (index,reason) => {
                result[index] = reason;

                if(++times === promises.length) {
                    reject(reason)
                }
            }
            for(let i = 0; i < promises.length; i++) {
                const p = promises[i];

                if(p && typeof p.then === 'function') {
                    p.then(resolve,(reason) => {
                        processError(i, reason)
                    })
                }
            }
        })
    }

    race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then(resolve, reject)
                } else {
                    resolve(p)
                }
            }
        })
    }

    allSettled(promises) {
        return new Promise((resolve, reject) => {
            const result = [];
            let times = 0;

            const processSucessOrError = (index,value,status) => {
                result[index] = {
                    [state === 'fulfilled'? 'value' : 'reason']:value,
                    status
                }
                if(++times === promises.length) {
                    resolve(result)
                }
            }

            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucessOrError(i,value,'fulfilled')
                    }, (resaon) => {
                        processSucessOrError(i,resaon,'rejected')
                    })
                } else {
                    processSucessOrError(i,p,'fulfilled')
                }
            }
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject('')
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (value) => {
                    resolvePromise(promise2, value, resolve, reject)
                }, (error) => {
                    reject(error)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            reject(error)
        }


    } else {
        resolve(x)
    }
}