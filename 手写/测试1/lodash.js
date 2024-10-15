//todo 1.防抖 debounce 回城
function debounce(fn, delay, immediate) {
    let timer;
    return function(...args) {
        if(!timer && immediate) {
            fn(...args);
        }
        if(timer) {
            clearTimeout(timer);
        };
        timer = setTimeout(() => {
            //todo
            // fn(...args);
            if(!immediate) {
                fn.apply(this, args);
            }
            //todo 
            timer = null;
        },delay)
    }

};

//todo 2.截流 throttle 技能冷却
function throttle(fn, delay) {
    let timer;

    return function(...args) {
        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                //todo
                timer = null;
            }, delay)
        }
    };
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
    if(typeof path !== 'string' || !Array.isArray(path)) {
        throw new TypeError('xxx');
    };
    // let arr;
    // if(typeof path === 'string') {
    //     arr = path.trim().split('.');
    // }else {
    //     arr = path;
    // };
    //todo 
    if (Array.isArray(path) && path.length === 0) {
        return defaultVal;
    };
    if (typeof path === 'string' && path.trim().length === 0) {
        return defaultVal;
    };
    const arr = Array.isArray(path) ? path : path.trim().split('.');
    const res =  arr.reduce((prev,cur) => {
        //todo
        // return (prev || {})[cur] || defaultVal
        return (prev || {})[cur]
    },source);

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
    const res = new Set();

    function getKey(obj) {
        // let res = '';
        // for(let key in obj) {
        //     if(Object.hasOwnProperty(key)) {
        //         res+=`${key}${typeof obj[key] === 'object' }`
        //     }
        // }
        //todo
        return Object.entries(([key,value]) => {
            if(value && typeof value === 'object') {
                return `${key}${getKey(value)}`
            }else {
                return `${key}${value}`
            }
        }).join('');
    };
    for(let item of arr) {
        //todo
        // if(typeof item === 'object' && item !== null) {
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
    };

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
    
};
function arrayToTree(arr) {
    
};

//todo 6.数组扁平化
let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];

function flatArray(arr) {
   
};

function flatArray(arr) {
   
};


//todo 7.实现数组分组
fn([1, 2, 3, 4, 5], 2); //结果为[[1,2],[3,4],[5]]

function fn(arr, size) {
    const res = [];
    for(let i = 0; i < arr.length; i+=size) {
        res.push(arr.slice(i, i + 2))
    };

    return res;
}