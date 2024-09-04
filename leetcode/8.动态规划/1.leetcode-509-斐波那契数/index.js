//24-9-4 第一次学习

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    //dp[i]表示第 i 个数字求得的值
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;

    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
};

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    let p = 0, q = 1;
    let sum;
    if(n === 0) return 0;
    if(n === 1) return 1

    for(let i = 2; i <= n; i++) {
        sum = p + q;
        p = q;
        q = sum;
    };

    return sum;
};