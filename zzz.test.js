const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
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
                this.onResolvedCallbacks.forEach((fn) => fn())
            }
        }

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.reason = reason;
                this.state = REJECTED;
                this.onRejectedCallbacks.forEach((fn) => fn())
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error)
        }
    }

    then(onFulilled, onRejected) {
        onFulilled = typeof onFulilled === 'function' ? onFulilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r }

        const promise2 = new Promise((resolve, reject) => {

            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        tyr {
                            const x = onFulilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        tyr {
                            const x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }

            if (this.state === FULFILLED) {
                setTimeout(() => {
                    tyr {
                        const x = onFulilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch (error) {
                        reject(error)
                    }
                }, 0)
            }


            if (this.state === REJECTED) {
                setTimeout(() => {
                    tyr {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch (error) {
                        reject(error)
                    }
                }, 0)
            }

        })

        return promise2

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

    static all(promises) {
        return new Promise((resolev, reject) => {
            let result = [];
            let len = 0;

            const processSucess = (index, value) => {
                result[index] = value;
                if (++len === promises.length) {
                    resolev(result)
                }
            }

            for (let i = 0; i < promises.length; i++) {
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
            for (let i = 0; i < promises.length; i++) {
                const p = p[i];

                if (p && typeof p.then === 'fucntion') {
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

            const result = [];
            let len = 0;

            const processError = (index, reason) => {
                result[index] = reason;
                if (++len === promises.length) {
                    reject(result)
                }
            }

            for (let i = 0; i < promises.length; i++) {
                const p = p[i];

                if (p && typeof p.then === 'fucntion') {
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
        return new Promise((resolev, reject) => {
            let result = [];
            let len = 0;

            const processSucessOrError = (index, value, status) => {
                result[index] = {
                    status,
                    [status === 'fulfilled' ? 'value' : 'reason']:value
                };
                if (++len === promises.length) {
                    resolev(result)
                }
            }

            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];

                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucessOrError(i, value, 'fulfilled')
                    }, (reason) => {
                        processSucessOrError(i,reason, 'rejected')
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
        return reject(new TypeError(''))
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, (value) => {
                    resolvePromise(promise2, value, resolve, reject)
                }, (reason) => {
                    reject(reason)
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