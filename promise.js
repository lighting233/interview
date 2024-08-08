const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const promise = new Promise((resolev, reject) => {
    resolve('123')
})
//promise2 === x的情况
const promise2 = new Promise((resolve, reject) => {
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
            if (then && typeof then === 'function') {
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
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
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
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
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

//下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：

function promiseAllWithLimit(promises, limit) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let running = 0;
        const res = []

        function run() {
            if (index >= promises.length && running === 0) {
                resolve(res);
                return;
            };

            while (running < limit && index < promises.length) {
                const p = promises[index];
                let curIdx = index;
                index++;
                running++;
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        res[curIdx] = v;
                    }).catch((e) => {
                        reject(e);
                    }).finall(() => {
                        running--;
                        run();
                    })
                } else {
                    res[curIdx] = p;
                    running--;
                }
            }
        };

        run();
    })
}

// -----------------mock一些请求
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

function scheduler(max) {
    // 存储待发请求
    const reqs = []
    // 请求中的数量
    let requesting = 0
    // 返回一个函数，接收一个参数，添加请求，并返回请求对应的响应
    return function (request) {
        const runTask = () => {
            // 只要有待发请求，并且满足请求中数量小于并发控制
            while (reqs.length && requesting < max) {
                // 取出执行
                const newReq = reqs.shift()
                // 请求中的数量++
                requesting++
                newReq().then(num => {
                    // 执行成功后请求中的数量--
                    requesting--
                    // 接着调用别的请求
                    runTask()
                    // 调用各自的resolve
                    newReq.reslove(num)
                })
            }
        }
        return new Promise((resolve) => {
            // 每个请求的resolve，缓存到请求上，等待请求成功调用
            request.reslove = resolve
            // 将请求添加到待发请求数组中
            reqs.push(request)
            // 开始调用
            runTask()
        })
    }
}


const request = (i) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000)
    })
}

// 改动以下代码，使最终打印的数字顺序 与 遍历的顺序一致。即 0，1，2，..., 9
for (let i = 0; i < 10; i++) {
    request(i).then(res => console.log(res))
}


//1
const request = (i) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000);
    });
};

let sequence = Promise.resolve();

for (let i = 0; i < 10; i++) {
    sequence = sequence.then(() => {
        return request(i).then(res => console.log(res));
    });
}

//2
const reqs = []
for (let i = 0; i < 10; i++) {
    reqs.push(request(i))
}

Promise.all(reqs).then(results => {
    while (results.length) {
        console.log(results.shift())
    }
})


function fetchWithTimeout(url, timeout = 300000) { // Default timeout is 5 minutes (300000ms)
    let timer; // Declare the timer variable
    return Promise.race([
        fetch(url), // The fetch request
        new Promise((_, reject) =>
            timer = setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]).then(response => {
        clearTimeout(timer); // Clear the timeout if the request completes in time
        return response;
    }).catch(err => {
        clearTimeout(timer); // Clear the timer in case of an error
        throw err;
    });
}
// Example usage
fetchWithTimeout('https://your.api/endpoint')
    .then(response => console.log('Response:', response))
    .catch(error => console.error('Error:', error));



function lastPromise(promiseFn) {
    let lastCallId = 0;
    return function () {
        const callId = ++lastCallId;
        console.log('%c 🍑 callId: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', callId);
        return promiseFn().then(result => {
            console.log('%c 🍝 lastCallId: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', lastCallId);

            if (callId === lastCallId) {
                return result;
            }
            return new Promise(() => { }); // 创建一个永不resolve的Promise，阻止非最后一次调用产生输出
        });
    };
}
// 示例 promiseFn，返回一个随机延迟后resolve的Promise
function promiseFn() {
    return new Promise(resolve => {
        const delay = Math.floor(Math.random() * 1000);
        setTimeout(() => resolve(`Resolved after ${delay}ms`), delay);
    });
}
// 使用 lastPromise 包装上述函数
let lastFn = lastPromise(promiseFn);
// 连续调用 lastFn
lastFn().then(console.log); // 大概率无输出
lastFn().then(console.log); // 大概率无输出
lastFn().then(console.log); // 只会输出这次调用的结果