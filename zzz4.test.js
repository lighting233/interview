
const promise = new Promise((resolve,reject) => {
    resolve(123)
})
promise.then((data) => {

},(error) => {

})

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('123'))
    }

    if ((typeof x !== null && typeof x === 'object') || typeof x === 'function') {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, (v) => {
                    resolvePromise(promise2, v, resolve, reject)
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

        const resolve = value => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        }

        const reject = reason => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (r) {
            reject(r);
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
                    } catch (r) {
                        reject(r);
                    }
                }, 0)
            }

            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (r) {
                        reject(r);
                    }
                }, 0)
            }

            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (r) {
                            reject(r);
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (r) {
                            reject(r);
                        }
                    }, 0)
                })
            }

        });

        return promise2;
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    catch(errorFn) {
        return this.then(null, errorFn)
    }

    finally(cb) {
        return this.then((value) => {
            return promise.resolve(cb()).then(() => value)
        }, (reason) => {
            return promise.resolve(cb()).then(() => { throw reason })
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const result = [];
            let times = 0;

            const processSucess = (idx,value) => {
                result[idx] = value;
                if(++times === len) {
                    resolve(result);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucess(i,value);
                    },(reason) => {
                        reject(reason);
                    })
                } else {
                    processSucess(i,p)
                }
            }
        })

    }

    static race(promises) {
        return new Promise((resolve,reject) => {
            const len = promises.length;

            for(let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then(resolve,reject);
                } else {
                    resolve(p);
                }
            }
        })
    }

    static any(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            if(len === 0) {
                reject('xxxx')
            }
            const result = [];
            let times = 0;

            const processError = (idx,reason) => {
                result[idx] = reason;
                if(++times === len) {
                    reject(result);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        resolve(value)
                    },(reason) => {
                        processError(i,reason);
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
            const result = [];
            let times = 0;

            const processSuccessOrError = (idx,val,status) => {
                result[idx] = {
                    status,
                    [status === 'fulfilled' ? 'value' : 'reason']: val
                };
                if(++times === len) {
                    resolve(result);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSuccessOrError(i,value,'fulfilled');
                    },(reason) => {
                        processSuccessOrError(i,reason,'rejected');
                    })
                } else {
                    processSuccessOrError(i,p,'fulfilled');
                }
            }
        })
    }

}

function curry(func) {
    return function curried(...args) {
        if(args.length >= func.length) {
            return func(...args);
        }else {
            return function (...moreArgs) {
                return curried(...[...args,...moreArgs])
            }
        }
    }
}

class EventBus {
    constructor() {
        this.events = [];
    }

    subscribe(eventName,callback,once = false) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        const subscription = {callback,onec};
        this.events[eventName].push(subscription);

        return () => {
            this.unSubscription(eventName,subscription);
        }
    }

    unSubscription(eventName,subscription) {
        if(this.events[eventName]) {
            const index = this.events[eventName].indexOf(subscription);
            if(index !== -1) {
                this.events[eventName].splice(index,1);
            }
        }
    }

    publish(eventName,...args) {
        if(this.events[eventName]) {
            const subscribers = this.events[eventName].slice();

            for(let subscription of subscribers) {
                subscription.callback(...args);

                if(subscription.once) {
                    this.unSubscription(eventName,subscription);
                }
            }
        }
    }
}


function compose(...fn) {
    if(fn.length === 0) {
        return (args) => args;
    }

    if(fn.length === 1) {
        return fn[0];
    }

    return fn.reduce((pre,cur) => {
        return (...args) => {
            return pre(cur(...args))
        }
    })
}

class App {
    constructor() {
        this.midddlewares = [];
    }

    compose(ctx) {
        let index = -1;
        const dispatch = (i) => {
            if(i <= index) {
                Promise.reject();
            }
            index = i;
            if(i === this.midddlewares.length) {
                Promise.resolve();
            }
            return Promise.resolve(this.midddlewares[i](ctx,() => dispatch(i+1)))
        };

        dispatch(0);
    }
}