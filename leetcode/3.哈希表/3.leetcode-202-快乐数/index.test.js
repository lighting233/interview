//24-8-13 第二次测试

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const set = new Set();

    while(n !== 1) {
        if(set.has(n)) return false;
        set.add(n);
        n = ('' + n).split('').reduce((prev,cur) => prev + cur * cur, 0);
    };

    return true;
};

