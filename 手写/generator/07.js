/**
 * async + await
 * 异步的终极解决方案,es6只是草案,es2017(es8)里才正式发布
 * await 可以等待后边的promise对象resolve时候的数据,然后赋值给变量
 * await 只能在async函数中使用
 */
const fs = require('fs');

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

async function go() {
    const data1 = await readFile('./data/1.txt');
    const data2 = await readFile('./data/2.txt');
    const data3 = await readFile('./data/3.txt');
    return data1 + data2 + data3
};
go().then((data) => {
    console.log("%c Line:28 🌭 data", "color:#33a5ff", data);
});

/**
 * 也可以匿名函数自执行
 * 减少一次手动调用
 */
(async () => {
    const data1 = await readFile('./data/1.txt');
    const data2 = await readFile('./data/2.txt');
    const data3 = await readFile('./data/3.txt');
    console.log(data1, data2, data3)
})();

/**
 * async + await就是promise + generator + yield + co 的语法糖
 * 
 */
function myCo(generatorFn, ...args) {
    //1. 先生成迭代器
    const iterator = generatorFn(...args);

    //2. 迭代器可以递归调用
    return new Promise((resolve, reject) => {
        function next(lastValue) {
            const { value, done } = iterator.next(lastValue); //{ value: Promise { <pending> }, done: false }
            //3. 递归终止条件
            if(done) {
                resolve(value);
            }else {
                value.then(next, reject);
            }
        }
        next();
    });
};

function read(param1, param2) {
    return myCo(function* (file1, file2) {
        const data1 = yield readFile('./data/1.txt');
        const data2 = yield readFile('./data/2.txt');
        const data3 = yield readFile('./data/3.txt');
        return data1 + data2 + data3
    }, param1, param2);
};
read('./data/1.txt', './data/2.txt').then((data) => {
    console.log(data)//123
});