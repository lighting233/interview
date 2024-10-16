//todo 1.如下代码所示，将字符串中由 包裹的变量替换为 data 中的值。
const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(data, str) {
    return str.replace(/\{\{(\w+(.\w+)*)\}\}/g, (match, p1) => {
        const arr = p1.split('.');
        return arr.reduce((prev, cur) => {
            return (prev || {})[cur];
        }, data)
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

    function run() {
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
        const nextDelay = count * b; // 计算下次执行的时间
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
    fn.sumOf = function () {
        return args.reduce((prev, cur) => prev + cur);
    };
    return fn;
}

//todo 4.比较版本号
/**
 * 12.2.1
 * 5.7.8
 * 1.5.6-alpha.1
 * 7.2.3-beta
 */

function compareVersion(str1, str2) {
    const map = { rc: 3, beta: 2, alpha: 1 };

    // 将版本号拆解为数组
    function parseVersion(str) {
        // 拆分主版本、次版本、修订版本和预发布版本
        const [main, preRelease] = str.split('-');
        const mainParts = main.split('.').map(Number);  // 解析主版本部分为数字数组
        const preParts = preRelease
            ? preRelease.split('.').map(part => (map[part] ? map[part] : Number(part))) // 预发布版本转为数字
            : [Infinity];  // 如果没有预发布版本，设置为 Infinity，表示优先级最大
        return [...mainParts, ...preParts];
    }

    const version1 = parseVersion(str1);
    const version2 = parseVersion(str2);

    // 逐一比较每一部分
    for (let i = 0; i < Math.max(version1.length, version2.length); i++) {
        const num1 = version1[i] || 0;  // 如果一方的长度不够，补充 0
        const num2 = version2[i] || 0;

        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0;  // 如果所有部分都相等，返回 0
}

// 测试
let str1 = "1.2.3";
let str2 = "1.3.0-alpha.1";
let str3 = "1.3.0";
let str4 = "1.3.0-beta.1";
let str5 = "1.3.0-rc.1";

console.log(compareVersion(str1, str2)); // -1
console.log(compareVersion(str2, str4)); // -1
console.log(compareVersion(str4, str5)); // -1
console.log(compareVersion(str5, str3)); // -1
console.log(compareVersion(str3, str1)); // 1


/**
* 题目
* Semantic Versioning 是一个前端通用的版本定义规范。
* 格式为“{MAJOR}.{MINOR}.{PATCH}-{alpha|beta|rc}.{number}”，
* 要求实现 compare(a, b) 方法，比较 a, b 两个版本大小。
* 
* 描述
* •当 a > b 是返回 1；
* •当 a = b 是返回 0；
* •当 a < b 是返回 -1；
* •其中，rc > beta > alpha，major > minor > patch；
* 
* 例子
* 1.2.3 < 1.2.4 < 1.3.0.alpha.1 < 1.3.0.alpha.2 < 1.3.0.beta.1 < 1.3.0.rc.1 < 1.3.0
*/

function compareVersion(str1, str2) {
    // 创建 rc, beta, alpha 权重, 替换为数值
    let map = { rc: 3, beta: 2, alpha: 1 };
    if (/(rc|beta|alpha)/.test(str1)) {
        str1 = str1.replace(/(rc|beta|alpha)/g, match => map[match]);
    } else {
        str1 += '.Infinity'
    };

    if (/(rc|beta|alpha)/.test(str2)) {
        str2 = str2.replace(/(rc|beta|alpha)/g, match => map[match]);
    } else {
        str2 += '.Infinity'
    };

    // 生成器获取每一项的字符
    function* walk(str) {
        let step = ''
        const terminals = ['.', '-']
        for (let i = 0; i < str.length; i++) {
            if (terminals.includes(str[i])) {
                yield step;
                step = ''
            } else {
                step += str[i]
            }
        }
        if (step) yield step
    }
    // 迭代比较
    const gen1 = walk(str1);
    const gen2 = walk(str2);

    while (true) {
        const iter1 = gen1.next();
        const iter2 = gen2.next();

        if (iter1.done && iter2.done) break;
        // 将字符串转换为数字进行比较，没有值时补充 0
        let num1 = iter1.value !== Infinity ? parseInt(iter1.value || 0, 10) : iter1.value;
        let num2 = iter2.value !== Infinity ? parseInt(iter2.value || 0, 10) : iter2.value;

        if (num1 > num2) return 1
        if (num1 < num2) return -1
    }
    return 0
}

// 测试
let str1 = "3.3.0-alpha.1";
let str2 = "3.3.0-rc.1";
console.log(compareVersion(str1, str2)); // -1