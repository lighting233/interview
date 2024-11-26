//todo 1.手写apply,call,bind
Function.prototype.apply = function (ctx, args = []) {//todo args要有默认值

};

Function.prototype.call = function (ctx, ...args) {

};

Function.prototype.bind = function (ctx, ...args) {

};

Function.prototype.bind = function (ctx, ...args) {

}

//todo 2.考察proxy
/**
 * 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
 * const res = obj[1][2][3] + 4;
 */
function createObj(sum = 0) {

};
const obj = createObj();
//todo 3.考察迭代器
/**
 * 使之成立
 * var [a, b] = { a: 1, b: 2 }
 * console.log(a, b) // 输出1 2
 */

//todo 4.考察原型和call和apply
console.log.call.call.call.call.apply((a) => a, [1, 2]);



//todo 5.统计字符串出现的频率

const str = 'adasaasdxcxcaadfffgggfs';

function times(str) {

};

//todo 6.?位置写什么才能输出true(考察隐式转换)
let a = '?';

console.log(
    a == 1 &&
    a == 2 &&
    a == 3
)

a =

//todo 7.下面的代码输出结果是什么?(考察对象属性和顺序)
const obj = {
    a: 0
};
obj['1'] = 0;
obj[++obj.a] = obj.a++;
const values = Object.values(obj);
obj[values[1]] = obj.a;
console.log(obj);

//todo 8.下面的代码输出结果是什么?(考察连续赋值);
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);



//todo 9.判断传入的函数是否标记了async
function isAsyncFunction(func) {


}