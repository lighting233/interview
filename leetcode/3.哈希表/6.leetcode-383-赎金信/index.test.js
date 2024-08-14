//24-8-13 第二次测试


/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    const arr = Array(26).fill(0);
    const base = 'a'.charCodeAt();
    for(let l of magazine) {
        arr[l.charCodeAt() - base]++;
    };

    for(let l of ransomNote) {
        const idx = l.charCodeAt() - base;
        if(arr[idx] === 0) return false;
        arr[idx]--;
    };

    return true;
};

