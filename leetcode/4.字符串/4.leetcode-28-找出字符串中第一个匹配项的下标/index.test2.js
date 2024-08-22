 //24-8-9 第一次测试

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function(haystack, needle) {
    if(haystack.length < needle.length) return -1;
    for(let i = 0; i <= haystack.length - needle.length; i++) {
        if(haystack[i] === needle[0]) {
            let cur = 0;
            //todo cur < needle.length不然两个字符串相等的话死循环
            while(cur < needle.length && haystack[i + cur] === needle[cur]) {
                cur++;
            }
            if(cur === needle.length) return i;
        }
    }

    return -1;
 };