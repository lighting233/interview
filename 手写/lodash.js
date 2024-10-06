//todo 1.防抖 debounce 回城(电梯关门)
//1.高频 2.耗时 3.以最后一次调用为准
function debounce(fn, delay, immediate) {
    let timer;
    //不是箭头函数的原因是,这个函数调用的时候的this就是fn的this指向,如果是箭头函数的话,没有this
    return function (...args) {
        if (!timer && immediate) {
            fn(...args);
        };
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (!immediate) {
                fn.apply(this, args);
            }
            timer = null;
        }, delay)
    }
};

//todo 2.截流 throttle 技能冷却
function throttle(fn, delay) {
    let timer;

    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay)
        }
    }
};


//todo 3.实现get
const obj = {
    user: {
        name: 'Alice',
        address: {
            city: 'New York'
        }
    }
}
const cityName = customGet(obj, 'user.address.city', 'Unknown');
console.log(cityName); // 输出：New York

/** 
 * * @param {object} source 
 * * @param {string | string[]} path 
 * * @param {any} [defaultValue] 
 * * @return {any} 
 * */
function customGet(source, path, defaultVal) {
    if (Array.isArray(path) && path.length === 0) {
        return defaultVal;
    };
    if (typeof path === 'string' && path.trim().length === 0) {
        return defaultVal;
    };
    const arr = Array.isArray(path) ? path : path.split('.');
    const res = arr.reduce((prev, cur) => {
        return (prev || {})[cur];
    }, source);

    return res === undefined ? defaultVal : res;
};

//todo 4.实现去重
let arr = [1, 1, '2', 3, 1, 2,
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 2 } },
]

function uniqueArr(arr) {
    const res = [];
    const set = new Set();
    function getKey(obj) {
        return Object.entries(obj).map(([key, value]) => {
            if(value && typeof value === 'object') {
                return `${key}${getKey(value)}`;
            }else {
                return `${key}${value}`
            }
        }).join('');
    }
    for(let item of arr) {
        if(item && typeof item === 'object') {
            const key = getKey(item);
            if(!set.has(key)) {
                res.push(item);
                set.add(key);
            }
        }else {
            if(!set.has(item)) {
                res.push(item);
                set.add(item);
            }
        }
    }
    return res;
};

//todo 5.arrToTree
const flatArray = [
    { id: 1, name: 'A', parentId: null },
    { id: 2, name: 'B', parentId: 1 },
    { id: 3, name: 'C', parentId: 1 },
    { id: 4, name: 'D', parentId: 2 },
    { id: 5, name: 'E', parentId: 2 },
    { id: 6, name: 'F', parentId: 3 },
    { id: 7, name: 'G', parentId: null }
];

function arrToTree(arr, parentId) {
    const res = [];
    for(let item of arr) {
        if(item.id === parentId) {
            const children = arrToTree(arr, item.id);
            if(children.length) {
                item.children = children;
            };
            res.push(item);
        }
    }
    return res;
};
function arrayToTree(arr) {
    const res = [];
    const map = {};

    for(let item of arr) {
        map[item.id] = item;
    };

    for(let item of arr) {
        if(map[item.parentId]) {
            if(!map[item.parentId].children) {
                map[item.parentId].children = [];
            };
            map[item.parentId].children.push(item);
        }else {
            res.push(item);
        }
    }

    return res;

};

//todo 6.数组扁平化
let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];

function flatArray(arr) {
    const stack = [...arr];
    const res = [];

    while(stack.length) {
        const item = stack.pop();
        if(Array.isArray(item)) {
            stack.push(...item);
        }else {
            res.unshift(item);
        }
    };

    return res;
};

function flatArray(arr) {
    return arr.reduce((prev,cur) => {
        return prev.concat(Array.isArray(cur) ? flatArray(cur) : cur)
    }, [])
};

//todo 7.实现数组分组
fn([1, 2, 3, 4, 5], 2); //结果为[[1,2],[3,4],[5]]

function fn(arr, size) {
    if(!Array.isArray(arr)) {
      throw new TypeError('xxx');  
    };
    const res = [];
    for(let i = 0; i < arr.length; i+=size) {
        arr.push(arr.slice(i, i + size))
    };

    return res;
}