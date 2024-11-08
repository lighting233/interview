//todo 1.下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：
function promiseAllWithLimit(promises, limit) {
    return new Promise((resolve, reject) => {
        let isRunning = 0;
        const len = promises.length;
        const res = [];
        let index = 0;

        function run() {
            //todo >=
            if (isRunning === 0 && index >= len) {
                return resolve(res);
            };

            while (isRunning < limit && index < len) {
                //todo
                const _idx = index;
                index++;
                isRunning++;
                const p = promises[_idx];
                //todo
                // p.then((data) => {
                //     res[index] = data;
                //     index++;
                //     isRunning--;
                // },reject)
                if (p && typeof p === 'function') {
                    p.then((data) => {
                        res[_idx] = data;
                    }, (error) => {
                        reject(error);
                        break;
                    }).finally(() => {
                        isRunning--;
                        run();
                    })
                } else {
                    resolve(p);
                    isRunning--;
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
    let isRunning = 0;
    const task = [];

    function run() {
        if(isRunning < max && task.length) {
            const item = task.shift();
            isRunning++;
            item().then((data) => {
                item.resolve(data);
                isRunning--;
                run();
            })
        }
    }

    return (requestFunc) => {
        return new Promise((resolve, reject) => {
            requestFunc.resolve = resolve;
            task.push(requestFunc)
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
const promises = [];
for (let i = 0; i < 10; i++) {
    promises.push(request(i))
};
Promise.all(promises).then((res) => {
    res.forEach((v) => console.log(v))
})
//todo 3.2
let thenable = Promise.resolve();
for (let i = 0; i < 10; i++) {
    thenable = thenable.then((v) => {
        //todo
        // console.log(v);
        // return request(i);
        return request(i).then(res => console.log(res))
    })
};
//todo 4.实现一个带有时间限制的fetch请求,时间内可以正常resolve,超出时限直接reject
// Example
fetchWithTimeout('https://your.api/endpoint')
    .then(response => console.log('Response:', response))
    .catch(error => console.error('Error:', error));

//todo 清除定时器
function fetchWithTimeout(url, timeout = 300000) {
    let timer;
    return Promise.race([
        fetch(url),
        new Promise((resolve, reject) => {
            timer = setTimeout(() => {
                reject(new Error('timeot'));
            }, timeout)
        })
    ]).finally(() => {
        clearTimeout(timer);
    });
};

//todo 5. 实现睡眠函数 new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

class LazyLog {
    constructor() {
        this.queue = [];
    };

    log(num) {
        this.queue.push(() => {
            console.log(num);
        });
        return this;
    };

    sleep(timeout) {
        this.queue.push(new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        }));
        return this;
    };

    async execute() {
        for(let task of this.queue) {
            if(task instanceof Promise) {
                await task;
            }else {
                task();
            }
        }
    }
};

//todo 6. 下面代码输出什么?
async function asy1() {
    console.log(1);
    await asy2();
    console.log(2);
};
asy2 = async () => {
    await setTimeout(() => {
        Promise.resolve().then(() => {
            console.log(3);
        });
        console.log(4);
    }, 0);
    //todo setTimeout执行完后,await后边的空代码相当于放入微任务队列
};

asy3 = async () => {
    Promise.resolve().then(() => {
        console.log(6)
    })
};

asy1();
console.log(7);
asy3();
// 1 7 6 4 3 2
//todo 1 7 6 2 4 3

async function asy1() {
    console.log(1);
    await asy2();
    console.log(2);
};
asy2 = async () => {
    await Promise.resolve().then(() => {
        Promise.resolve().then(() => {
            console.log(3);
        });
        console.log(4);
    });
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

// 1 7 4 5 6 3 2

//todo 1 7 4 6 3 5 2

