//24-9-24 第一次学习

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    let count = 0;
    let len = s.length;

    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === ' ') {
            if (count) {
                break;
            }
        } else {
            count++;
        }
    };

    return count;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    const len = s.length;
    let count = 0

    for (let i = len - 1; i >= 0; i--) {
        if(s[i] === ' ') {
            if(count > 0) break;
        }else {
            count++;
        }
    }

    return count;
};

