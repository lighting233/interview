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