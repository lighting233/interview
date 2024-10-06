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

console.log(uniqueArr(arr))