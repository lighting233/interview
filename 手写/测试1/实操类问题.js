//todo 1.如下代码所示，将字符串中由 包裹的变量替换为 data 中的值。
const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(data, str) {
    function getVal(obj, path) {
        return path.split('.').reduce((prev,cur) => {
            //todo
            // return prev[cur] || {}
            return (prev || {})[cur]
        },data)
    };
    //todo /\{\{(\w+(.\w+)*)\}\}/g
    return str.replace(/\{\{(\w)\}\}/g, (match, p1) => {
        return getVal(data, p1)
    })
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
    let timer;
    let times = 0;
    function run() {
        timer = setTimeout(() => {
            fn.apply(this);
            times++;
            run();
        }, a + times * b)
    }
    run();
    return () => {
        timer && clearTimeout(timer);
    }
};

//todo 3.设计一个sum函数，使其满足以下要求
sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {
    function fn(...restArgs) {
        //todo
        // return sum(...[...args, ...restArgs])
        return sum(..args, ...restArgs)
    };
    fn.sumOf = function() {
        return args.reduce((prev, cur) => prev + cur)
    };
    return fn;
}

//todo 4.比较版本号
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
    const map = {
        'alpha': 1,
        'beta': 2,
        'rc': 3
    };
    function parseVersion(str) {
        const [mainParts, versionParts] = str.split('-');
        const mainList = mainParts.split('.').map(Number);
        const versionList = versionParts ? versionParts.split('.').map((item) => map[item] ? map[item] : Number(item)) : [Infinity];

        return [...mainList, ...versionList];
    };

    const numlist1 = parseVersion(str1);
    const numlist2 = parseVersion(str2);

    for(let i = 0; i < Math.max(numlist1.length, numlist2.length); i++) {
        const val1 = numlist1[i] || 0;
        const val2 = numlist2[i] || 0;

        if(val1 > val2) {
            return 1;
        }else if( val1 < val2) {
            return -1;
        }
    };

    return 0;
};

function compareVersion(str1, str2) {
    const map = {
        'alpha': 1,
        'beta': 2,
        'rc': 3
    };
    str1 = str1.replace(/(alpha|beta|rc)/g, match => map[match]);
    str2 = str2.replace(/(alpha|beta|rc)/g, match => map[match]);

    function* walk(str) {
        let version;
        const terminals = ['.','-'];
        for(let i = 0; i < str.length; i++) {
            if(terminals.includes(str[i])) {
                yield version;
                version = '';
            }else {
                version+=str[i];
            }
        };
        if(version) {
            yield version;
        }
    };

    const genrator1 = walk(str1);
    const genrator2 = walk(str2);

    while(true) {
        const iterator1 = genrator1.next();
        const iterator2 = genrator2.next();

        if(iterator1.done && iterator2.done) break;
        const val1 = next1.done ? next1.value
    };

    return 0;
}