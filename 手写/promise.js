PENDING = 'PENDING';
FULFILLED = 'FULFILLED';
REJECTED = 'REJECTED';

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(Promise.resolve('123'))
    }, 0);
    //resolve(Promise.resolve('123'))
});

p.then((data) => {
    console.log(data);
    //return Promise.resolve('123')
    //return p;
}).catch((e) => {

});

function resolvePromise(x, promise2, resolve, reject) {
    //todo
    if (x === promise2) {
        return reject(new TypeError('xxx'));
    };
    //todo 不光有对象,还有函数
    // if (typeof x === 'object' && typeof x !== null) {
    if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                //todo
                // const x2 = then.call(null, resolve, reject);
                // resolvePromise(x2, p, resolve, reject);
                then.call(x, (v) => {
                    resolvePromise(v, promise2, resolve, reject)
                }, (r) => reject(r))
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
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
                //todo
                // return value.then;
                return value.then(resolve, reject);
            }
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        };

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        };

        try {
            executor(resolve, reject);
        } catch (reason) {
            reject(reason);
        }

    };

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                queueMicrotask(() => {
                    try {
                        //x的值决定promise2的 resolve, reject,如果x是promise则取他的状态
                        const x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            };
            if (this.state === REJECTED) {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            };
            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallbacks(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        });

        return promise2;
    };

    catch(fn) {
        return this.then(null, fn);
    };

    /**
     * 无论前边是成功失败都执行,可以继续向下执行
     * 如果finally中返回一个promise需要等待这个promise执行完再往下走
     * 并且透传的的值和返回的promise无关
     */
    finally(cb) {
        return this.then((value) => {
            //then中return promise会等待这个promise执行完
            return Promise.resolve(cb()).then(() => value)
        }, (reason) => {
            return Promise.resolve(cb()).then(() => { throw reason })
        })
    };

    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value);
        })
    };

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    };

    //全部成功resolve,一个失败直接reject
    //当所有的输入promise实例的状态都改变为fulfilled状态，新的promise实例才是fulfilled状态，返回所有输入promise实例的resolve value数组；
    //如果有一个promise实例的状态是rejected，则新的promise实例的状态就是rejected，返回第一个promise reject的reason
    static all(promises) {
        const res = [];
        let times = 0;
        const len = promises.length;
        const processSucess = (idx, value) => {
            res[idx] = value;
            if (++times === len) {
                resolve(res);
            }
        }
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucess(i, value);
                    }, (reason) => {
                        reject(reason);
                    })
                } else {
                    processSucess(i, p);
                };
            }
        });
    };

    //返回第一个改变状态的
    static race(promises) {
        const len = promises.length;
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then(resolve,reject)
                } else {
                    resolve(p);
                };
            }
        });
    };

    //返回promise数组中最先变成fulfilled实例的value，如果，所有输入的promise实例的状态都是rejected， 返回all promise were rejected
    static any(promises) {
        const res = [];
        let times = 0;
        const len = promises.length;
        if (len === 0) {
            reject('xxx')
        }
        const processError = (idx, reason) => {
            res[idx] = reason;
            if (++times === len) {
                resolve(res);
            }
        }
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        resolve(value);
                    }, (reason) => {
                        processSucess(i, reason);
                    })
                } else {
                    resolve(p);
                };
            }
        });
    };

    //无论成功还是失败,等到所有状态都处理完后返回
    static allSettled(promises) {
        const res = [];
        let times = 0;
        const len = promises.length;
        const processSucessOrError = (idx, value, status) => {
            res[idx] = {
                status,
                [status === 'fulfilled' ? 'value' : 'reason']: value
            };
            if (++times === len) {
                resolve(res);
            }
        }
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then((value) => {
                        processSucess(i, value, 'fulfilled');
                    }, (reason) => {
                        processSucessOrError(i, reason, 'rejected')
                    })
                } else {
                    processSucessOrError(i, p, 'fulfilled');
                };
            }
        });
    };
};

