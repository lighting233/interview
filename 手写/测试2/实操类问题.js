//todo 1.如下代码所示，将字符串中由 包裹的变量替换为 data 中的值。
const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(date, str) {
    function getVal(obj, path) {
        return path.split('.').reduce((prev, cur) => {
            return (prev || {})[cur]
        }, obj)
    };

    //todo p1 正则
    // return str.replace(/\{\{(\w+(.\w*))\}\}/g, (match, p1) => {
    //     return getVal(obj,p0)
    // })
    return str.replace(/\{\{(\w+(.\w+)*)\}\}/g, (match, p1) => {
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
            fn();
            times++;
            run();
        }, a + times*b)
    };  
    run();
    return () => {
        clearTimeout(timer);
        timer = null;
    }
};

//todo 3.设计一个sum函数，使其满足以下要求
sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {
    //todo 
    // return function foo(...restArgs) {
    //     return sum(...args,...restArgs)
    // };
     function foo(...restArgs) {
        return sum(...args,...restArgs)
    };
    foo.sumOf = function() {
        return args.reduce((prev,cur) => prev + cur)
    }
    return foo;
};

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
* 1.2.3 < 1.2.4 < 1.3.0-alpha.1 < 1.3.0-alpha.2 < 1.3.0-beta.1 < 1.3.0-rc.1 < 1.3.0
*/

function compareVersion(str1, str2) {
    const map = {
        'rc': 3,
        'beta': 2,
        'alpha': 1
    };
    function getNumArr(str) {
        const [left, right] = str.split('-');
        //todo Number
        const leftArr = left.split('.'),map(Number);
        //todo Number [Infinity]
        const rightArr = right ? right.split('.').map((item) => map[item] ? map[item] : Number(item)) : [Infinity];
        return leftArr.concat(rightArr);
    };
    const arr1 = getNumArr(str1);
    const arr2 = getNumArr(str2);

    for(let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        const val1 = arr1[i] || 0;
        const val2 = arr2[i] || 0;

        if(val1 > val2) {
            return 1
        }else if(val1 < val2) {
            return -1;
        };
    };

    return 0;
};

//todo 5.快排

/**
 * - **时间复杂度**：最坏情况 $O(n^2)$，平均情况 $O(n \log n)$。
 * - **空间复杂度**：$O(n)$，由于额外的数组和递归调用栈。
 */
function quickSort(arr = []) {
    //todo
    if(arr.length < 2) return arr;
    
    const idx = Math.floor(arr.length / 2);
    const val = arr[idx];
    let left = [], right =[];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < val) {
            left.push(arr[i]);
        }else if(arr[i] > val) {
            right.push(arr[i]);
        };
    };

    return quickSort(left).concat([val], quickSort(right));
}