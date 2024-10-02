
/**
 * generator 函数 返回的迭代器
 * 内部的 yield 除了可以给外部返回数据，还可以想内部传递数据
 */

function* run() {
    let a = yield '1';
    console.log("%c Line:9 🍰 a", "color:#7f2b82", a); //a 是下一次next调用时候传递的值
    let b = yield '2';
    console.log("%c Line:11 🥪 b", "color:#7f2b82", b);
    let c = yield '3';
    console.log("%c Line:13 🌶 c", "color:#4fff4B", c);
};

const iterator = run();
console.log(iterator.next());
console.log(iterator.next('外部传递的值1'));
console.log(iterator.next('外部传递的值2'));
console.log(iterator.next('外部传递的值3'));