/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    const dp = [0, 1];

    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i - 2] + dp[i - 1];
    };

    return dp[n];
};

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    if(n === 0) return 0;
    if(n === 1) return 1;
    let p = 0, q = 1, sum = 1;

    for(let i = 2; i <= n; i++) {
        sum = p + q;
        p = q;
        q = sum;
    };

    return sum;
};

