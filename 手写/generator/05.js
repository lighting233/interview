const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const co = require('co')
/**
 * generator 函数 返回的迭代器
 * 内部的 yield 除了可以给外部返回数据，还可以想内部传递数据
 */

function* run() {
    let a = yield readFile('./data/1.txt'); //return一个promise对象
    console.log("%c Line:9 🍰 a", "color:#7f2b82", a); //a 是下一次next调用时候传递的值
    let b = yield readFile('./data/2.txt');
    console.log("%c Line:11 🥪 b", "color:#7f2b82", b);
    let c = yield readFile('./data/3.txt');  
    console.log("%c Line:13 🌶 c", "color:#4fff4B", c);

    return a + b + c;
};

const iterator = run();
//console.log(iterator.next()); //{ value: Promise { <pending> }, done: false }
iterator.next().value.then((data) => {
    console.log(data.toString());
    iterator.next(data.toString()).value.then((data) => {
        console.log(data.toString());
        iterator.next(data.toString()).value.then((data) => {
            console.log(data.toString());
            console.log(iterator.next(data.toString()));
        })
    })
})

//co接受一个生成器,自动执行迭代器,返回一个promise
const c1 = co(run);
c1.then((data) => {
    console.log(data);//123
});