/**
 * 现在使用promise和fs解决回调地狱问题
 * 需求: 读取三个文件,按顺序读取,读完1再读2
 */
const fs = require('fs');
const { resolve } = require('path');
const p1 = new Promise((resolve, reject) => {
    fs.readFile('./lodash.js', 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data)
        }
    })
});
const p2 = new Promise((resolve, reject) => {
    fs.readFile('./promise.js', 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data)
        }
    })
});
const p3 = new Promise((resolve, reject) => {
    fs.readFile('./compose.js', 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data)
        }
    })
});
//promise开火车,并没有完全屏蔽掉回调函数,只是一个中间产物.异步的终极解决方案是async+await
let str = '';
p1.then((data) => {
    console.log(data);
    str += data;
    return p2; //return 一个promise对象,会把resolve时候的date传递给下一个then的第一个函数的参数
}).then((date) => {
    console.log(data);
    str += data;
    return p3;
}).then((date) => {
    console.log(data);
    str += data;
});

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};
readFile('./lodash.js').then((data) => {
    str+=data;
    return readFile('./promise.js');
}).then((data) => {
    str+=data;
    return readFile('./compose.js');
}).then((data) => {
    str+=data
    console.log(str);
});

//generator 函数为处理异步编程提供了解决方法，【内部封装了大量的状态】，【允许代码执行的时候进行暂停】
//generator 是“生成器函数，执行后返回一个迭代器
//generator在内部通过 yield关键字定义状态, yield 翻译过来有输出、产出的意思，并且yield 关键字只能在 generator 函数内部使用，最后，通过 return 定义最后一个状态，return 后面的状态就不在执行。

function* run() {
    yield 'run1';
    yield 'run2';
    yield 'run3';

    return 'over';
};
const iterator = run();
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


//runSetTimeout解决了回调的写法,而且可以暂停执行,但目前不能自动执行完,需要手动调用next()
setTimeout(() => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
        setTimeout(() => {
            console.log(3);
        })
    },2000)
},1000);

function* runSetTimeout() {
    yield setTimeout(() => console.log(1), 1000);
    yield setTimeout(() => console.log(2), 2000);
    yield setTimeout(() => console.log(3), 3000);

    return 'over';
};

const iterator2 = runSetTimeout();
iterator2.next();
iterator2.next();
iterator2.next();
iterator2.next();