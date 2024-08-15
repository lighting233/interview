//24-8-15 第一次学习

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    //1.判断长度
    if(haystack.length < needle.length) return -1;
    //2.从haystack的每个元素开始比对
    for(let i = 0; i < haystack.length; i++) {
        //3.初始相等才有匹配的意义
        if(haystack[i] === needle[0] && haystack.length - i >= needle.length) {
            let j = 0;
            //4.先判断i + j < haystack.length && j < needle.length防止越界
            //todo 不需要判断i + j < haystack.length， 上一步判断过了
            // while(i + j < haystack.length && j < needle.length && haystack[i + j] === needle[j]) {
            while(j < needle.length && haystack[i + j] === needle[j]) {
                j++;
            };

            if(j === needle.length) return i;
        }
    };

    return -1;
};

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {

};