//todo 1.防抖 debounce 回城
function debounce(fn, delay, immediate) {
    // let timer;
    // let _this = this;
    // return function(...args) {
    //     if(timer) {
    //         clearTimeout(timer);
    //     };
    //     if(immediate){
    //         fn.apply(_this, args);

    //     };

    //     timer = setTimeout(() => {
    //         fn.apply(_this, args);
    //         timer = null;
    //     },delay)
    // }
    let timer;

    return function(...args) {
        if(!timer && immediate) {
            fn.apply(this,args);
            //todo
            // timer = null;
        };
        clearTimeout(timer);
        timer = setTimeout(() => {
            if(!immediate) {
                fn.apply(this,args);
            };
            timer = null;
        },delay)
    }
};

//todo 2.截流 throttle 技能冷却
function throttle(fn, delay) {
    let timer;

    return function(...args) {
        if(timer) return;
        timer = setTimeout(() => {
            fn.apply(this,args);
            timer = null;
        }, delay)
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
    let arr;
    if (typeof path === 'string') {
        arr = path.trim().split('.')
    } else if (Array.isArray(path)) {
        arr = path
    };

    const res = arr.reduce((prev, cur) => {
        return (prev || {})[cur]
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
    const set = new Set();
    const res = [];
    function getKey(obj) {
        //todo key, value
        return Object.entries(obj).map(([key, value]) => {
            //todo value && typeof value === 'object'
            if(value && typeof value === 'object') {
                return `${key}${getKey(value)}`;
            }else {
                return `${key}${value}`;
            }
        }).join('')
    };
    for(let item of arr) {
        if(item && typeof item === 'object') {
            const key = getKey(item);
            if(set.has(key)) {
                set.add(key);
                res.push(item);
            }
        }else {
            if(set.has(item)) {
                set.add(item);
                res.push(item);
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
        if(item.parentId === parentId) {
            const children = arrToTree(arr, item.id);
            if(children.length) {
                item.children = children;
            }
            res.push(item);
        }
    };

    return res;
};
function arrayToTree(arr) {
    const map = arr.reduce((prev,cur) => {
        prev[cur.id] = cur;
    },{});

    const res = [];
    for(let item of arr) {
        if(item.parentId) {
            if(!map[item.parentId]) {
                map[item.parentId].children = []
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
    const res = [];
    const stack = [...nestedArray];

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
    const res = [];
    for(let i = 0; i < arr.length; i+=size) {
        res.push(arr.slice(i, i+ size))
    };
    return res;
}