/**
 * 现在使用promise和fs解决回调地狱问题
 * 需求: 读取三个文件,按顺序读取,读完1再读2
 */
const fs = require('fs');

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