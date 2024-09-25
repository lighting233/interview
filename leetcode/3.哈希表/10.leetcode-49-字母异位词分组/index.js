//24-9-24 第一次学习

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();

    for(let str of strs) {
        const val = str.split('').sort().join('');
        if(!map.has(val)) {
            map.set(val,[]);
        };
        map.get(val).push(str);
    };

    return [...map.values()];
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for(let word of strs) {
        const key = word.split('').sort().join('');
        if(!map.has(key)) {
            map.set(key, []);
        };
        map.get(key).push(word);
    };

    return [...map.values()];
};