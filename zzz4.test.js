
const promise = new Promise((resolve,reject) => {
    resolve(123)
})
promise.then((data) => {

},(error) => {

})

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2,x,resolve,reject) {
    if(promise2 === x) {
        return reject(new TypeError('xxx')) 
    }

    if((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            const then = x.then;
            if(typeof then === 'function') {
                then.call(x,(v) => {
                    resolvePromise(promise2,v,resolve,reject);
                },(r) => {
                    reject(r)
                })
            }else {
                resolve(x)
            }
        } catch(r) {
            reject(r)
        }
    }else {
        resolve(x)
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
            if(value instanceof Promise) {
                return value.then(resolve,reject)
            }
            if(this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach((fn) => fn())
            }
        }

        const reject = reason => {
            if(this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn())
            }
        }

        try {
            executor(resolve,reject);
        } catch(r) {
            reject(r);
        }
    }

    then(onFulfilled,onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => {throw r};

        const promise2 = new Promise((resolve,reject) => {
            if(this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (r) {
                        reject(r);
                    }
                },0)
            }
            if(this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (r) {
                        reject(r);
                    }
                },0)
            }
            if(this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (r) {
                            reject(r);
                        }
                    },0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (r) {
                            reject(r);
                        }
                    },0)
                })
            }
        });

        return promise2;
    }
}