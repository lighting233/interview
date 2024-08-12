//24-8-12 第一次学习

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isAnagram = function(s, t) {
    //1.首先长度不相等就排除了
    if(s.length !== t.length) return false;
    const arr = Array(26).fill(0);
    //2.获取 a 的 asc码的长度
    const base = 'a'.charCodeAt();

    for(let letter of s) {
        arr[letter.charCodeAt() - base]++;
    };

    for(let letter of t) {
        //3.目前两个字符串个长度相同，如果 t 中出现 s 中没有的就有问题
        if(arr[letter.charCodeAt() - base] === 0) return false;
        arr[letter.charCodeAt() - base]--;
    }

    return true;
 };

 /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    const arr = Array(26).fill(0);
    const base = 'a'.charCodeAt();

    for(let l of s) {
        arr[l.charCodeAt() - base]++;
    };

    for(let l of t) {
        if(arr[l.charCodeAt() - base] === 0) return false;
        arr[l.charCodeAt() - base]--
    };

    return true
};