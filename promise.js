const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const promise = new Promise((resolev, reject) => {
    resolve('123')
})
//promise2 === x的情况
const promise2 = new Promise((resolve,reject) => {
    resolve(123)
}).then((data) => {
    return promise2
}, (reason) => {

})
promise2.then((data) => {

})

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('123'))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (v) => {
                    resolvePromise(promise2, v, resolve, reject)
                }, (r) => {
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            //Promise.resolve的等待效果
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach((fn) => fn())
            }
        }
        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onResolvedCallbacks.forEach((fn) => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = this.onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = this.onRejected(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)


            }
            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = this.onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = this.onRejected(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
            }
        })

        return promise2;
    }

    catch(errorFn) {
        return this.then(null, errorFn)
    }

    //无论如何都会执行，但可以向下继续执行
    finally(cb) {
        return this.then((value) => {
            return Promise.resolve(cb()).then(() => value)
        }, (reason) => {
            return Promise.resolve(cb()).then(() => { throw reason })
        })
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }

    //当所有的输入promise实例的状态都改变为fulfilled状态，新的promise实例才是fulfilled状态，返回所有输入promise实例的resolve value数组；
    //如果有一个promise实例的状态是rejected，则新的promise实例的状态就是rejected，返回第一个promise reject的reason
    static all(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const result = [];
            let times = 0;
            const processSucess = (idx, value) => {
                result[idx] = value;
                if (++times === len) {
                    resolve(result)
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

    //返回最先执行结束的promise的value或者reason，不论状态是rejected还是fulfilled
    static race(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
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

    //返回promise数组中最先变成fulfilled实例的value，如果，所有输入的promise实例的状态都是rejected， 返回all promise were rejected
    static any(promises = []) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            if (len === 0) {
                reject('123')
            }
            const result = [];
            let times = 0;
            const processError = (idx, value) => {
                result[idx] = value;
                if (++times === len) {
                    reject(result)
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

    //返回所有promise实例执行的数组，格式如下
    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            const result = [];
            const len = promise.length;
            let times = 0;
            const processSucessOrError = (idx, value, type) => {
                result[idx] = {
                    status: type,
                    [type === 'fulfilled' ? 'value' : 'reason']: value
                }
                if (++times === len) {
                    resolve(result)
                }
            }
            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        processSucessOrError(i, p, 'fulfilled')
                    }, (r) => {
                        processSucessOrError(i, p, 'rejected')
                    })
                } else {
                    processSucessOrError(i, p, 'fulfilled')
                }
            }
        })

    }

}

