//todo 1.下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：
function promiseAllWithLimit(promises, limit) {

    return new Promise((resolve, reject) => {
        let running = 0;
        let len = promises.length;
        let index = 0;
        const res = [];

        //todo
        function run() {
            if (index >= len && running === 0) {
                //todo return
                return resolve(res);
            };
            while (running < limit && index < len) {
                let curIndex = index;
                const p = promises[index];
                running++;
                index++;
                if (p && typeof p.then === 'function') {
                    promises[curIndex].then((data) => {
                        res[curIndex] = data;
                    }, (error) => {
                        reject(error);
                        //todo
                        break;
                    }).finally(() => {
                        running--;
                        run();
                    })
                } else {
                    res[curIndex] = p;
                    running--;
                }
            }
        }

        run();
    })
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
    //todo
    const promises = [];
    let running = 0;

    function run() {
        if (running < max && promises.length) {
            const { req, resolve } = promises.unshift();
            running++;
            req().then((data) => {
                resolve(data);
                running--;
                //todo
                run();
            })
        }

    }

    return function (req) {
        return new Promise((resolve, reject) => {
            promises.push({ req, resolve });
            run();
        })
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
let thanble = Promise.resolve();
for (let i = 0; i < 10; i++) {
    thanble = thanble.then(() => request(i).then(res => console.log(res)))
};
//todo 3.2

//todo 4.实现一个带有时间限制的fetch请求,时间内可以正常resolve,超出时限直接reject
// Example
fetchWithTimeout('https://your.api/endpoint')
    .then(response => console.log('Response:', response))
    .catch(error => console.error('Error:', error));

function fetchWithTimeout(url, timeout = 300000) {
    let timer;
    return Promise.race([
        fetch(url),
        new Promise((resolve, reject) => {
            timer = setTimeout(() => reject(new Error(timeout))
        }, timeout))
    ]).finally(() => {
        clearTimeout(timer);
    })
};

//todo 5. 实现睡眠函数 new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

class LazyLog {
    constructor() {
        this.queue = [];
    };

    log(num) {
        this.queue.push(() => {
            console.log(num)
        });
        return this;
    };

    sleep(delay) {
        this.queue.push(new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, delay)
        }));
        return this;
    };

    async execute() {
        for (let task of this.queue) {
            if (task instanceof Promise) {
                await task
            } else {
                task();
            }
        }
    }
}

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

};

asy3 = async () => {
    Promise.resolve().then(() => {
        console.log(6)
    })
};

asy1();
console.log(7);
asy3();
//1 7 6 2 4 3


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
//todo 
//1 7 4 5 6 3 2
//1 7 4 6 3 5 2