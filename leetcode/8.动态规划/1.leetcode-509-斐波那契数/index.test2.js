/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    if(n === 0 )return 0;
    if(n === 1) return 1;
    let p = 0, q = 1, sum = 1;

    for(let i = 2; i <=n; i++) {
        sum = p + q;
        p = q;
        q = sum;
    };

    return sum;
};

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {

};