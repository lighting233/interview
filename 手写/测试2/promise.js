const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const p = new Promise((resolve, reject) => {

});

p.then((value) => {
    return p;
}, (reason) => {

});

function resolvePromise(x, promise2, resolve, reject) {
    if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        if (x === promise2) {
            return reject(new TypeError('xxxx'));
        };
        try {
            const then = x.then;

            if (then && typeof then === 'function') {
                then.call(x, (v) => {
                    resolvePromise(v, promise2, resolve, reject);
                }, reject);
            } else {
                resolve(x);
            }
        } catch (r) {
            reject(r);
        };
    } else {
        resolve(x);
    };
};

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject);
            }
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.onFulfilledCallbacks.forEach((fn) => fn());
            };
        };

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach((fn) => fn());
            };
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        };
    };

    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r };

        const promise2 = new Promise((resolve, reject)) => {
            if (this.status === FULFILLED) {
                queueMicrotask(() => {
                    try {
                        const x = onFulFilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            };
            if (this.status === REJECTED) {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            };
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onFulFilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    });
                });
                this.onRejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    });
                });
            };
        };

        return promise2;
    };

    static resolve(value) {
        return new Promise((resolve) => resolve(value));
    };

    static reject(reason) {
        return new Promise((resolve, reject) => reject(reason));
    };

    catch(cb) {
        //todo return
        return this.then(null, cb);
    };

    finally(cb) {
        return this.then((v) => {
            //todo
            // Promise.resolve(cb());
            // return v;
            return Promise.resolve(cb()).then(() => v);
        }, (r) => {
            //todo
            // Promise.resolve(cb());
            return Promise.resolve(cb()).then(() => { throw r });
        })
    };



    static all(promises = []) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const res = [];
            let times = 0;
            const processSucess = (idx, value) => {
                //todo 
                // if (times++ === len) {
                //     return resolve(res);
                // };
                // res[idx] = value;
                res[idx] = value;
                if (++times === len) {
                    return resolve(res);
                }
            };

            for (let i = 0; i < len; i++) {
                const p = promises[i];

                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        processSucess(i, v);
                    }, (r) => {
                        reject(r);
                    })
                } else {
                    processSucess(i, p);
                }
            }

        });
    };

    static race(promises) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            for (let i = 0; i < len; i++) {
                const p = promises[i];
                if (p && typeof p.then === 'function') {
                    p.then(resolve, reject);
                } else {
                    resolve(p)
                };
            }
        })
    };

    static any() {

    };

    static allSettled() {

    };
}

async function asyncFunc() {
    const a = await Promise.resolve(1);
    const b = await Promise.resolve(2);
    return a + b;
};

asyncFunc().then((data) => {
    console.log(data);
});

function co(generatorFunc) {
    const iterator = generatorFunc()
    return new Promise((resolve, reject) => {
        function next(params) {
            const { value, done } = iterator.next(params);
            if (done) {
                return resolve(params);
            } else {
                //todo
                // value.then((data) => {
                //     next(data);
                // })
                value.then(next, reject)
            }
        };

        next();
    });
};

function asyncFunc2() {
    return co(function* () {
        const a = yield Promise.resolve(1);
        const b = yield Promise.resolve(2);

        return a + b;
    });
}


