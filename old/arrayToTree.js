function arrayToTree(arr, parentId) {
    const res = [];
    arr.forEach((item) => {
        if (item.parentId === parentId) {
            const children = arrayToTree(arr,item.id)
            if(children.length) {
                item.children = children;
            }
            res.push(item);
        }
    })
    return res;
}

function arrayToTree2(arr) {
    const res = [];
    const map = {};
    arr.forEach((item) => {
        map[item.id] = item;
    });
    arr.forEach((item) => {
        if(item.parentId) {
            const parent = map[item.parentId];
            if(!parent.children) {
                parent.children = [];
            }
            parent.children.push(map[item.id])
        }else {
            res.push(map[item.id])
        }
    })
    return res;
}

// 示例用法
const flatArray = [
    { id: 1, name: 'A', parentId: null },
    { id: 2, name: 'B', parentId: 1 },
    { id: 3, name: 'C', parentId: 1 },
    { id: 4, name: 'D', parentId: 2 },
    { id: 5, name: 'E', parentId: 2 },
    { id: 6, name: 'F', parentId: 3 },
    { id: 7, name: 'G', parentId: null }
];

const tree = arrayToTree(flatArray, null);
console.log(tree);


//扁平化数组
let nestedArray = [1, 2, [3, 4], [5, [6, 7]]];
const flat = (arr) => {
    return arr.reduce((prev, cur) => {
        console.log("%c Line:48 🍷 prev", "color:#fca650", prev);
        console.log("%c Line:48 🍤 cur", "color:#3f7cff", cur);
        return prev.concat(Array.isArray(cur) ? flat(cur) : cur)
    }, [])
}
flat(nestedArray)
const flat2 = (arr) => {
    const res = [];

    const stack = [...arr];

    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item);
        } else {
            res.unshift(item)
        }
    }

    return res;
}

//实现一个sleep函数
class LazyLog {
    constructor() {
        this.queue = [];
    }

    log(value) {
        this.queue.push(() => {
            console.log(value);
        });
        return this;
    }

    sleep(ms) {
        this.queue.push(new Promise(resolve => {
            setTimeout(resolve, ms);
        }));
        return this;
    }

    async execute() {
        for (const task of this.queue) {
            console.log(typeof task)
            if (typeof task === 'function') {
                task();
            } else if (task instanceof Promise) {
                await task;
            }
        }
    }
}

new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

// 使用示例
(async () => {
    await (new LazyLog()).log(1).sleep(1000).log(2).log(3).execute();
})();

// 设计一个sum函数，使其满足以下要求

sum(1, 2).sumOf() // 返回 3

sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15

function sum(...args) {
    // 一个内部函数，用于计算参数的和
    const f = (...newArgs) => sum(...args.concat(newArgs));
    // sumOf方法，调用时计算参数总和
    f.sumOf = () => args.reduce((acc, current) => acc + current, 0);
    return f;
}

console.log(sum(1, 2).sumOf()); // 返回 3
console.log(sum(1, 2)(3).sumOf()); // 返回 6
console.log(sum(1)(2, 3, 4).sumOf()); // 返回 10
console.log(sum(1, 2)(3, 4)(5).sumOf()); // 返回 15
// (async () => {
//     await (new LazyLog()).log(1).sleep(1000).log(2).log(3).execute();
// })();


function getStorageSize(type = 'local') {
    const storage = type === 'local' ? localStorage : sessionStorage
    storage.clear()
    const oneBytes = '1' // 1字节
    const oneKB = oneBytes.repeat(1024)// 1KB
    let key = 0
    let flag = true
    while (flag) {
        try {
            storage.setItem(key + '', oneKB)
            key += 1
        } catch (error) {
            flag = false
            console.log('size:', key / 1024 + 'MB')
            storage.clear()
        }
    }
}


function getUsedStorage(type = 'local') {
    const storage = type === 'local' ? localStorage : sessionStorage;
    let totalBytes = 0;

    Object.entries(storage).forEach(([key, value]) => {
        const size = new Blob([key, value]).size;
        totalBytes += size;
    });

    return totalBytes / 1024 / 1024; // 转换为MB
}


//去重

let arr = [1, 1, '2', 3, 1, 2,
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 2 } },
]

function uniqueArr(arr) {
    const seen = new Set();
    const result = [];
    // 自定义序列化函数，考虑键的顺序
    const serialize = (obj) => {
        return Object.entries(obj)
            .map(([key, value]) => {
                // 如果值是对象，递归序列化
                if (value && typeof value === 'object') {
                    return `${key}:{${serialize(value)}}`;
                } else {
                    // 其他类型直接转换为字符串
                    return `${key}:${value}`;
                }
            })
            .join(',');
    };
    // 遍历数组
    for (const item of arr) {
        if (item && typeof item === 'object') {
            const key = serialize(item);
            if (!seen.has(key)) {
                seen.add(key);
                result.push(item);
            }
        } else {
            // 基本类型直接加入集合
            if (!seen.has(item)) {
                seen.add(item);
                result.push(item);
            }
        }
    }
    return result;
}
console.log(uniqueArr(arr));
