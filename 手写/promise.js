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
    }
}