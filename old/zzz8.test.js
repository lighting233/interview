//1.deepClone
//2.new
function mynew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}
//3.create
function mycreate(prototype) {
    function F() { };
    F.prototype = prototype;
    return new F();
}
//4.instanceof

function instanceof(obj,constructor) {
    if(typeof obj === null || typeof obj !== 'object' || typeof obj !== 'function') {
    
    }
    if(typeof constructor !== 'function') {
    
    }
    const conPro = constructor.prototype;
    let cur = Object.getPrototypeOf(obj);

    while(cur !== null) {
        if(cur === conPro) {
        return true
    }
    }
}
//5.apply

Function.prototype.apply = function(ctx,args = []) {
    ctx = ctx || window;
    const symbolKey = Symbol();
    ctx[symbolKey] = this;
    const res = ctx[symbolKey](...args);
    delete ctx[symbolKey];
    return res;
}
//6.curry

function currying(fn) {
    return function curried (...args){
        if(fn.length >= args.length) {
            fn(...args);
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
    if(fn.length === 1) return fn[0]
    return fn.reduce((prev,cur) => {
        return (...args) => {
            return prev(cur(...args))
        }
    })
}
//8.extends

function Parent(name) {

}

function Sub(name,age) {
    this.age = age;
    Parent.apply(this,name);
    extends(Sub,Parent)
}

function extends(child,parents) {
    Object.setProperty(child,parents);
    const prototype = Object.create(parents.prototype);
    prototype.constructor = child;
    child.prototype = prototype
}
//9.debounce throttle

const { isSymbol, delay, reject, set } = require("lodash");

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

function customGet(obj,path,defaultVal) {
    const arr = path.split('.');

    return arr.reduce((prev,cur) => {
        return (prev || {})[cur]
    },obj) || defaultVal
}

//11.fn([1, 2, 3, 4, 5], 2); //结果为[[1,2],[3,4],[5]]
//12.map filller
//13.//去重

let arr = [1, 1, '2', 3, 1, 2,
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 2 } },
]

function uniqueArr(arr) {

    const res = [];
    const set = new set();

    function helper(item) {
        return Object.entries(item).map(([key,value]) => {
            if(value && typeof value === 'object') {
                return `${key}${helper(value)}`
            }else {
                return `${key}${value}`
            }
        }).join('.')
    }

    for(let item of arr) {
        if(item && typeof item === 'object') {
            const key = helper(item);
            if(!set.has(key)) {
                set.add(key);
                res.push(item);
            }
        }else {
            if(!set.has(item)) {
                set.add(item);
                res.push(item)
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
//15.//扁平化数组
let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];

//16.new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

//17.// 设计一个sum函数，使其满足以下要求

sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {

    const fn = (...moreArgs) => sum(...[...args, ...moreArgs]);
    fn.sumOf = () => args.reduce((p, c) => p + c, 0)
    return fn;
}

//18.//下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：
//19.// -----------------mock一些请求
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

function scheduler(limit = 0) {
    const queue = [];
    let running = 0;

    function run() {
        while (running < limit && queue.length) {
            const req = queue.shift();
            running++;
            req().then((val) => {
                running--;
                req.resolve(val);
                run();
            })
        }

    }

    return function assrequest(req) {
        return new Promise((resolve, reject) => {
            req.resolve = resolve;
            queue.push(req);
            run();
        })
    }
}

//20.
const request = (i) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000)
    })
}

// 改动以下代码，使最终打印的数字顺序 与 遍历的顺序一致。即 0，1，2，..., 9
for (let i = 0; i < 10; i++) {
    request(i).then(res => console.log(res))
}



//21.写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
// 要求：
// 1、不能使用全局变量
// 2、直接调用Foo()也会返回实例化的对象
// 3、实例化的对象必须是Foo的实例
const Foo = (function () {
    let count = 0;

    function Foo() {
        if (!(this instanceof Foo)) {
            return new Foo();
        }
        count++;
        this.count = count;
    };

    return Foo;
})()

//22实现一个定时器函数myTimer(fn, a, b)，
// 让fn执行，
// 第一次执行是a毫秒后，
// 第二次执行是a+b毫秒后，
// 第三次是a+2b毫秒，
// 第N次执行是a+Nb毫秒后

/**
 * 要求：
 1、白板手撕
 2、myTimer要有返回值，并且返回值是一个函数，调用该函数，可以让myTimer停掉
 */


function myTimer(fn, a, b) {
    let timer;
    let count = 0;

    function func() {
        delay = a + b * count;
        timer = setTimeout(() => {
            fn();
            count++;
            func();
        }, delay)
    }

    func();

    return () => {
        clearTimeout(timer);
    }
}

//23.// 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
const res = obj[1][2][3] + 4;
function creatObj(value = 0) {
    return new Proxy({}, {
        get(target, key) {
            if (key === Symbol.toPrimitive) {
                return () => value;
            }
            return creatObj(parseInt(key) + value)
        }
    })
}
const obj = creatObj();


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

function parse(data, str) {

    function getVal(val) {
        return val.split('.').reduce((prev, cur) => prev[cur], data)
    }

    return str.replace(/\{\{(\d|\w|\.)+\}\}/g, match => {
        const val = match.slice(2, -2);
        return getVal(val);
    })
}
parse(data, str);
