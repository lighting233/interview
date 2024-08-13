//24-8-13 第二次测试

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if(s.length !== t.length) return false;
    const arr = Array(26).fill(0);
    const base = 'a'.charCodeAt();

    for(let l of s) {
        arr[l.charCodeAt() - base]++;
    };

    for(let l of t) {
        if(arr[l.charCodeAt() - base] === 0) return false;
        arr[l.charCodeAt() - base]--;
    };

    return true;
};

