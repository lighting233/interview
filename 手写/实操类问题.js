//todo 1.如下代码所示，将字符串中由 包裹的变量替换为 data 中的值。
const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(date, str) {

};
parse(data, str);

//todo 2.实现一个定时器函数 myTimer(fn, a, b)，
/**
* 让fn执行，
* 第一次执行是a毫秒后，
* 第二次执行是a+b毫秒后，
* 第三次是a+2b毫秒，
* 第N次执行是a+Nb毫秒后
* 要求：
* 1、白板手撕
* 2、myTimer要有返回值，并且返回值是一个函数，调用该函数，可以让myTimer停掉
*/

function myTimer(fn, a, b) {
    
};

//todo 3.设计一个sum函数，使其满足以下要求
sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {

}