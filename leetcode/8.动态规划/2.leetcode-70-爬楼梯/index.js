//24-9-4 第一次学习

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    //dp[i] 走到 i 阶有 dp[i]种方法
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    for(let i = 3; i <=n; i++) {
        dp[i] = dp[i - 2] + dp[i - 1];
    }
    return dp[n];
};



/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    const dp = [0,1,2];
    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i - 2] + dp[i - 1];
    };

    return dp[n];
};