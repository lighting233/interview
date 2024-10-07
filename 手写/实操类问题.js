//todo 1.如下代码所示，将字符串中由 包裹的变量替换为 data 中的值。
const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(data, str) {
    return str.replace(/\{\{(\w+(.\w+)*)\}\}/g,(match,p1) => {
        const arr = p1.split('.');
        return arr.reduce((prev,cur) => {
            return (prev || {})[cur];
        },data)
    })
};
parse(data, str);

//todo 2.实现一个定时器函数 myTimer(fn, a, b)，
/**
* 让fn执行，
* 第一次执行是a毫秒后，
* 第二次执行是a+b毫秒后，(这个时间指的是距离第一次函数调用开始的时间)
* 第三次是a+2b毫秒，
* 第N次执行是a+Nb毫秒后
* 要求：
* 1、白板手撕
* 2、myTimer要有返回值，并且返回值是一个函数，调用该函数，可以让myTimer停掉
*/

function myTimer(fn, a, b) {
    let timer;
    let times = 0;

    function fn() {
        let delay = a + times * b;
        timer = setTimeout(() => {
            fn();
            times++;
            run();
        }, delay);
    }
    
    run();

    return () => {
        timer && clearTimeout(timer);
    }
};

function myTimer(fn, a, b) {
    let timerId; // 用于存储定时器的 ID
    let count = 0; // 计数器，记录执行次数

    const execute = () => {
        fn(); // 执行传入的函数
        count++; // 增加计数
        // 计算下次执行的延迟时间
        const nextDelay =  count * b; // 计算下次执行的时间
        timerId = setTimeout(execute, nextDelay); // 设置下次执行
    };

    // 启动第一次执行
    timerId = setTimeout(execute, a);

    // 返回一个函数，用于停止定时器
    return function stop() {
        clearTimeout(timerId); // 清除定时器
    };
}

//todo 3.设计一个sum函数，使其满足以下要求
sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {
    function fn(...restArgs) {
        return sum(...args, ...restArgs)
    };
    fn.sumOf = function() {
        return args.reduce((prev,cur) => prev + cur);
    };
    return fn;
}