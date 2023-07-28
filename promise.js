const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const promise = new Promise((resolev, reject) => {
    resolve('123')
})

const promise2 = promise.then((data) => {

}, (reason) => {

})
promise2.then((data) => {

})

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
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
                        }this.catch(e) {
                            reject(e)
                        }
                    }, 0)

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = this.onRejected(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        }this.catch(e) {
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

    finally(cb) {
        return this.then((value) => {
            return Promise.resolve(cb()).then(() => value)
        },(reason) => {
            return Promise.resolve(cb()).then(() => {throw reason})
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

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then(resolve, reject)
                } else {
                    resolve(i, p)
                }
            }
        })
    }

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
                    resolve(value)
                }
            }
        })
    }
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

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('123'))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (v) => {
                    resolvePromise(promise2, x, resolve, reject)
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