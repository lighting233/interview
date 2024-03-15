/** 
 * * @param {object} source 
 * * @param {string | string[]} path 
 * * @param {any} [defaultValue] 
 * * @return {any} 
 * */
function customGet(source, path, defaultValue) {
    if (Array.isArray(path) && path.length === 0) {
        return defaultValue;
    }
    if (typeof path === 'string' && path.trim().length === 0) {
        return defaultValue;
    }
    path = Array.isArray(path) ? path : path.split('.');

    const res = path.reduce((prev,cur) => {
        return (prev || {})[cur]
    },source)
    return res !== undefined ? res : defaultValue
}

// 示例用法
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

const nonExistentProp = customGet(obj, 'user.age', 'N/A');
console.log(nonExistentProp); // 输出：N/A