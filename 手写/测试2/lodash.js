//todo 1.防抖 debounce 回城
function debounce(fn, delay, immediate) {


};

//todo 2.截流 throttle 技能冷却
function throttle(fn, delay) {

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
    
};

//todo 4.实现去重
let arr = [1, 1, '2', 3, 1, 2,
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 1 }, a: undefined },
    { name: '张三', id: { n: 2 } },
]

function uniqueArr(arr) {

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
    
}