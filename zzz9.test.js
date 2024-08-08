const { set, delay } = require("lodash");
const { run } = require("node:test");

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('...'))
    };
    //todo typeof x == 'function'
    if ((typeof x == 'object' && typeof x !== null) || typeof x == 'function') {
        try {
            const then = x.then;
            if (then && typeof then === 'function') {
                then.call(x, (value) => {
                    resolvePromise(value, promise2, resolve, reject)
                }, (e) => {
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
        };
    } else {
        resolve(x);
    }
}

class Promisee {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.resason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof Promise) {
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
        }

        try {
            executor(resolve, reject);
        } catch (reason) {
            reject(reason);
        }
    };

    then(onFulfilled, onRejected) {
        //todo promise2外侧
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r };

        const promise2 = new Promise((resolve, reject) => {

            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                }, 0)
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.resason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                }, 0)
            }
            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    }, 0);
                })

                this.onRejectedCallbacks(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    }, 0)
                })
            }
        })
        return promise2;
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    catch(errorFn) {
        return this.then(null, errorFn);
    };

    finally(cb) {
        return this.then((value) => {
            return Promise.resolve(cb()).then(() => value);
        }, (reason) => {
            return Promise.resolve(cb()).then(() => { throw reason });
        })
    };

    static all(promises = []) {
        return new Promise((resolve, reject) => {
            const len = promises.length;
            const res = [];
            let times = 0;

            const processSucess = (idx, val) => {
                res[idx] = val;
                times++;
                if (times === len) {
                    resolve(res);
                }
            }

            for (let i = 0; i < len; i++) {
                const p = promises[i];

                if (p && p.then && typeof p.then === 'function') {
                    p.then((val) => {
                        processSucess(i, val);
                    }, (e) => {
                        reject(e);
                    })
                } else {
                    processSucess(i, p);
                }
            }

        });
    }
}

//下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：
function promiseAllWithLimit(promises, limit) {
    return new Promise((resolve, reject) => {
        let res = [];
        let running = 0;
        let index = 0;
        const len = promises.length;

        const run = () => {
            if (index >= len && running === 0) {
                return resolve(res);
            };
            while (running < limit && index < len) {
                const p = promises[i];
                let curIdx = index;
                index++;
                running++;
                p.then((value) => {
                    res[curIdx] = value;
                }).catch((e) => {
                    reject(e);
                }).finally(() => {
                    running--;
                    run();
                })
            }
        };

        run();
    });

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

function scheduler(limit) {
    let running = 0;
    const queue = [];
    const run = () => {
        //todo queue.length
        while (running < limit && queue.length) {
            const req = queue.shift();
            running++;
            req().then((v) => {
                req.resolve(v);
                running--;
                run();
            })
        }
    }
    return (req) => {
        return new Promise((resolve, reject) => {
            req.resolve = resolve;
            queue.push(req);
            run();
        });
    }
}



// 改动以下代码，使最终打印的数字顺序 与 遍历的顺序一致。即 0，1，2，..., 9
const request = (i) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000)
    })
}

for (let i = 0; i < 10; i++) {
    request(i).then(res => console.log(res))
}

//1
const promises = [];
for (let i = 0; i < 10; i++) {
    promises.push(request(i))
}
//todo .then
Promise.all(promises).then((res) => {
    res.forEach((val) => console.log(val));
})
//2
let sequence = Promise.resolve();
for (let i = 0; i < 10; i++) {
    sequence = sequence.then(() => {
        return request(i).then(res => console.log(res))
    })
}

//1.deepClone
function getType(obj) {
    return Object.prototype.toString.call(obj);
}
const travelTypes = ['[object Object]', '[object Array]', '[object Map]', '[object Set]', '[object Arguments]',];
function cloneOthers(obj, objType) {
    switch (objType) {
        case '[object Number]':
        case '[object String]':
        case '[object Boolean]':
        case '[object Error]':
        case '[object Date]':
            return new obj.constructor(obj.valueOf());
        case '[object Symbol]':
        case '[object BigInt]':
            return Object(obj.valueOf());
        case '[object Regexp]':
            return cloneRegexp(obj);
    }
}
function cloneRegExp(obj) {
    const { source, flags, lastIndex } = obj;
    const res = new RegExp(source, flags);
    res.lastIndex = lastIndex;
    return res;
}
function deepClone(obj, clonedObj = new WeekMap()) {
    if (typeof obj !== 'object' || typeof obj === null || typeof obj === 'function') {
        return obj;
    };
    if (clonedObj.has(obj)) {
        return clonedObj.get(obj);
    }

    let copyObj;
    const objType = getType(obj);
    if (travelTypes.includes(objType)) {
        copyObj = new obj.constructor();
        clonedObj.set(obj, copyObj);
    } else {
        return cloneOthers(obj, objType);
    }

    if (objType === '[object Set]') {
        obj.forEach((value) => {
            copyObj.add(deepClone(value, clonedObj))
        });
        //todo return
        return copyObj;
    }
    if (objType === '[object Map]') {
        obj.forEach((value, key) => {
            copyObj.set(key, deepClone(value, clonedObj))
        });
        return copyObj;
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepClone(obj[key], clonedObj);
        }
    };
    return copyObj;
}
//2.new
function myNew(constructor,...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj,args);
    return res instanceof Object ? res : obj;
}
//3.create
function create(prototype) {
    function F(){};
    F.prototype = prototype;
    return new F();
}

//4.instanceof

function instanceof(obj,constructor) {
    if(typeof obj !== 'object' || typeof obj === null || typeof oj !== 'function') {
        return false;
    }
    if(typeof constructor !== 'function') {
        return new TypeError('');
    };
    const constructorProto = constructor.prototype;
    let cur = Object.getPrototypeOf(obj);

    while(cur) {
        if(cur === constructorProto) {
            return true;
        };
        cur = Object.getPrototypeOf(cur);
    }
    return false;
}

//5.apply bind
Function.prototype.bind = function(ctx,...args) {
    const ctx = ctx || window;
    const key = Symbol();
    ctx[key] = this;

    return (...moreArgs) => {
        const res = ctx[key](...[...args,...moreArgs]);
        delete ctx[key];
        return res;
    }
}

//6.curry

function curry(func) {
    return function curried(...args) {
        if(args.length >= func.length) {
            return func(...args);
        }else {
            return (...moreArgs) => {
                return curried(...[...args,...moreArgs])
            }
        }
    }
}


//7.compose

function compose(...fn) {
    if(fn.length === 0) return (v) => v;
    if(fn.length === 1) return fn[0];

    return fn.reduce((prev,cur) => {
        return (...args) => {
            prev(cur(...args))
        }
    })
}

//8.extends

function Parent(name) {

}

function Sub(name, age) {
    Parent.call(this,name);
    extends(Sub,Parent);
}

function extends (child, parents) {
    //todo setPrototypeOf
    Object.setPrototypeOf(child,parents);
    const prototype = Object.create(parents.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
//9.debounce throttle

function debounce(fn, delay, immediate) {
    let timer;

    //todo function
    return function (...args) {
        const ctx = this;
        if (!timer && immediate) {
            fn.apply(ctx, args);
        }
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            if(!immediate) {
                fn.apply(ctx, args);
            }
            timer = null;
        }, delay)
    }

}

function throttle(fn, delay, options = {}) [
    const { leading = false, trailing = true } = options;
    let timer;
    let prevTime = 0;

    return function(...args) {
        const ctx = this;
        let currentTime = Date.now();

        //todo !timer
        if(leading && currentTime - prevTime > delay && !timer) {
            fn.apply(ctx,args);
            prevTime = currentTime;
        }else if(trailing && !timer) {
            timer = setTimeout(() => {
                //todo prevTime = currentTime;
                prevTime = currentTime;
                fn.apply(ctx,args);
                timer = null;
            },delay)
        }
    }
]

//10.// 示例用法
const obj = {
    user: {
        name: 'Alice',
        address: {
            city: 'New York'
        }
    }
}
const cityName = customGet(obj, 'user.address.city', 'Unknown');
console.log(cityName); // 输出：New York

function customGet(obj, path, defaultVal) {

}

//11.fn([1, 2, 3, 4, 5], 2); //结果为[[1,2],[3,4],[5]]
//12.map filller
Array.prototype.filter = function (cb, ctx = window) {
    return this.reduce((prev, cur, index, array) => {
        const res = cb.call(ctx, cur, index, array);
        if (res) {
            prev.push(cur);
        }
        return prev;
    }, [])
}
//13.//去重

let arr = [1, 1, '2', 3, 1, 2,
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 2 } },
]

function uniqueArr(arr) {
    const res = [];
    const set = new Set();
    const getKey = (obj) => {
        return Object.entries(obj).map(([key, value]) => {
            if (value && typeof value === 'object') {
                return `${key}${getKey(value)}`
            } else {
                return `${key}${value}`
            }
        }).join('')
    };
    for (let item of arr) {
        if (item && typeof item === 'object') {
            const key = getKey(item);
            if (!set.has(key)) {
                res.push(item);
                set.add(key);
            }
        } else {
            if (!set.has(item)) {
                res.push(item);
                set.add(item);
            }
        }
    }

    return res;

}
//14.// 示例用法
const flatArray = [
    { id: 1, name: 'A', parentId: null },
    { id: 2, name: 'B', parentId: 1 },
    { id: 3, name: 'C', parentId: 1 },
    { id: 4, name: 'D', parentId: 2 },
    { id: 5, name: 'E', parentId: 2 },
    { id: 6, name: 'F', parentId: 3 },
    { id: 7, name: 'G', parentId: null }
];
function arrToTree(arr, parentId) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].parentId === parentId) {
            const children = arrToTree(arr, arr[i].id);
            if (children.length) {
                arr[i].children = children;
            };
            res.push(arr[i])
        }
    }
    return res;
}
function arrayToTree(arr) {
    const res = [];
    const map = {};
    for (let item of arr) {
        map[item.id] = item;
    }
    for (let item of arr) {
        if (map[item.parentId]) {
            if (!map[item.parentId].children) {
                map[item.parentId].children = []
            }
            map[item.parentId].children.push(item);
        } else {
            res.push(item);
        }
    }
    return res;
}
//15.//扁平化数组
let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];

function flatArray(arr) {
    // const stack = [...arr];
    // const res = [];
    // while(stack.length) {
    //     const node = stack.pop();
    //     if(Array.isArray(node)) {
    //         stack.push(...node);
    //     }else {
    //         res.unshift(node);
    //     }
    // }
    // return res;
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flatArray(cur) : cur);
    }, [])
}

//16.new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

class LazyLog {
    constructor() {
        this.queue = [];
    };

    log(num) {
        this.queue.push(() => {
            console.log(num)
        })
        return this;
    };

    sleep(delay) {
        this.queue.push(new Promise((resolve, reject) => {
            setTimeout(() => {
                //todo resolve
                resolve()
            }, delay)
        }))
        return this;
    }

    async execute() {
        for (let task of this.queue) {
            if (typeof task === 'function') {
                task();
            } else if (task instanceof Promise) {
                await task;
            }
        }
    }
}

//17.// 设计一个sum函数，使其满足以下要求

sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {
    function f(...moreArgs) {
        return sum(...[...args, ...moreArgs]);
    }
    f.sumOf = function () {
        return args.reduce((prev, cur) => prev + cur, 0)
    }

    return f;

}






//21.写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
// 要求：
// 1、不能使用全局变量
// 2、直接调用Foo()也会返回实例化的对象
// 3、实例化的对象必须是Foo的实例

let Foo = (function () {
    let times = 0;
    function Foo() {
        if (!(this instanceof Foo)) {
            return new Foo();
        }
        times++;
        this.id = times;
    }
    return Foo;
})()




//22实现一个定时器函数myTimer(fn, a, b)，
// 让fn执行，
// 第一次执行是a毫秒后，
// 第二次执行是a+b毫秒后，
// 第三次是a+2b毫秒，
// 第N次执行是a+Nb毫秒后

// 要求：
// 1、白板手撕
// 2、myTimer要有返回值，并且返回值是一个函数，调用该函数，可以让myTimer停掉

function myTimer(fn, a, b) {
    let timer;
    let num = 0;

    function run() {
        const delay = a * (num * b);
        const context = this;
        timer = setTimeout(() => {
            fn.apply(context);
            num++;
            run();
        }, delay);
    }

    run();
    return () => {
        clearTimeout(timer);
    }
}

//23.// 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
const res = obj[1][2][3] + 4;
const createObj = (value = 0) => {
    return new Proxy({}, {
        get(target, propKey) {
            //todo toPrimitive
            if (propKey === Symbol.toPrimitive) {
                return () => value;
            }
            return createObj(Number(propKey) + value);
        }
    })
}
const obj = createObj()

//24.// 使之成立
var [a, b] = { a: 1, b: 2 }
console.log(a, b) // 输出1 2

Object.prototype[Symbol.interator] = function () {
    return Object.values(this)[Symbol.interator]();
}

//25.如下代码所示，将字符串中由 包裹的变量替换为 data 中的值。
const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(date, str) {
    const getVal = (path) => {
        const arr = path.split('.');
        return arr.reduce((prev, cur) => {
            return (prev || {})[cur];
        }, data)
    };

    return str.replace(/\{\{[\d|\w|.]+\}\}/g, (match) => {
        //todo path
        const path = match.slice(2, -2);
        return getVal(path);
    })
};
parse(data, str);

