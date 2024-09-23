//24-9-22 第一次学习

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let common = strs[0];

    for(let i = 1; i < strs.length; i++) {
        let j = 0;
        while(j < common.length && j < strs[i].length && common[j] === strs[i][j]) {
            j++;
        };
        common = common.slice(0,j);
        if(common === '') return '';
    };

    return common;
};

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {

};