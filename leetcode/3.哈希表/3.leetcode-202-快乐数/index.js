//24-8-13 第一次学习

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const set = new Set();

    while(n !== 1) {
        if(set.has(n)) return false;
        set.add(n);
        n = ('' + n).split('').reduce((prev,cur) => prev + cur * cur,0);
    }

    return true;
};

/**
* @param {number} n
* @return {boolean}
*/
var isHappy = function (n) {
    const set = new Set();
    while(n !== 1) {
        if(set.has(n)) return false;
        set.add(n);
        n = ('' + n).split('').reduce((prev,cur) => prev + cur*cur,0)
    }

    return true;
};