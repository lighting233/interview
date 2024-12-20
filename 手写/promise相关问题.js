//todo 1.下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：
function promiseAllWithLimit(promises, limit) {

    return new Promise((resolve, reject) => {
        const len = promises.length;
        let index = 0;
        let running = 0;
        const res = [];

        function run() {
            //所有的promise都执行完,并且即便最后一个promise调用了,也要检查是否还有在执行中的
            if (index >= len && running === 0) {
                return resolve(res);
            };

            while (running < limit && index < len) {
                const _idx = index;
                index++;
                running++;
                const p = promises[_idx];
                if (p && typeof p.then === 'function') {
                    p.then((v) => {
                        res[_idx] = v;
                    }, (r) => {
                        reject(r);
                        break;
                    }).finally(() => {
                        running--;
                        run();
                    })
                } else {
                    res[_idx] = p;
                    running--;
                    run();
                }
            }
        };

        run();
    });
};

//todo 2.实现一个 scheduler 函数，满足以下要求：
/**
 * 1.接收一个参数 max 控制最大并发请求量
 * 2.执行以下代码依次输出：2、3、1、4
 */
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
    const promises = [];
    let running = 0;

    //在scheduler里声明run函数,不用再重复创建
    function run() {
        if (running < max && promises.length) {
            const { req, resolve } = promises.shift();
            running++;
            req().then((v) => {
                resolve(v);
                running--;
                run();
            })
        }
    };
    return function (req) {

        return new Promise((resolve, reject) => {
            //每个promise要带着自己对应的resolve,执行后才能在自己的函数里then
            promises.push({ req, resolve });
            run();
        });
    }
};

//todo 3.改动以下代码，使最终打印的数字顺序 与 遍历的顺序一致。即 0，1，2，..., 9
const request = (i) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000)
    })
};
//改动
for (let i = 0; i < 10; i++) {
    request(i).then(res => console.log(res))
};
//todo 3.1
let sequence = Promise.resolve();
for (let i = 0; i < 10; i++) {
    sequence = sequence.then(() => {
        return request(i).then(res => console.log(res))
    });
};
//todo 3.2
const promises = [];
for (let i = 0; i < 10; i++) {
    promises.push(request(i));
};
Promise.all(promises).then((res) => {
    res.forEach((v) => console.log(v));
});


//todo 4.实现一个带有时间限制的fetch请求,时间内可以正常resolve,超出时限直接reject
// Example
fetchWithTimeout('https://your.api/endpoint', 3000)
    .then(response => console.log('Response:', response))
    .catch(error => console.error('Error:', error));

function fetchWithTimeout(url, timeout = 300000) {
    let timer;
    return new Promise((resolve, reject) => {
        Promise.race([
            fetch(url),
            new Promise((resolve, reject) => {
                timer = setTimeout(() => {
                    reject(new Error('timeout!'))
                }, timeout);
            })
        ]).then((response) => {
            clearTimeout(timer);
            return response;
        }).catch((e) => {
            clearTimeout(timer);
            throw e;
        })
    })
};

//todo 5. 实现睡眠函数 new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

class LazyLog {
    constructor() {
        this.queue = [];
    };

    log(number) {
        this.queue.push(() => {
            console.log(number);
        });
        //能链式调用需要this
        return this;
    };

    sleep(delay) {
        this.queue.push(new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, delay)
        }));
        return this;
    };

    async execute() {
        for (let task of this.queue) {
            if (task instanceof Promise) {
                await task;
            } else {
                task();
            }
        }
    };
};

//todo 6. 下面代码输出什么?
async function asy1() {
    console.log(1);
    //当 await 后的 Promise 被解析（resolved）时，事件循环会将 await 后的代码放入微任务队列（microtask queue）。
    await asy2();
    //等待asy2完成后,加入微队列
    console.log(2);
};
asy2 = async () => {
    //执行到这相当于执行Promise.resolve(timerID)
    await setTimeout(() => {
        Promise.resolve().then(() => {
            console.log(3);
        });
        console.log(4);
    }, 0);
    //微队列里去完成asy2
};

asy3 = async () => {
    Promise.resolve().then(() => {
        console.log(6)
    })
};

asy1();
console.log(7);
asy3();
//176243


async function asy1() {
    console.log(1);
    //当 await 后的 Promise 被解析（resolved）时，事件循环会将 await 后的代码放入微任务队列（microtask queue）。
    await asy2();
    //等待asy2完成后,加入微队列
    console.log(2);
};
asy2 = async () => {
    await Promise.resolve().then(() => {
        Promise.resolve().then(() => {
            console.log(3);
        });
        console.log(4);
    });
    //为什么 console.log(5); 要等到前面的代码执行完？
    //1. await 暂停了 async 函数的执行，直到 Promise 完成（这里 await 等待的是 Promise.resolve().then(...) 整个链条完成）。await 语句等待第一个 Promise 链完全完成。
    //2. 微任务优先于 await 后的代码执行：微任务队列中的任务会在当前同步任务执行完后立刻执行，而 await 后面的代码也被作为一个微任务，但它会排在所有已有微任务之后。
    //当所有同步代码和微任务都完成后，await 后面的代码 console.log(5); 才会执行，输出 5。
    console.log(5);
};

asy3 = async () => {
    Promise.resolve().then(() => {
        console.log(6)
    })
};

asy1();
console.log(7);
asy3();

//1746352