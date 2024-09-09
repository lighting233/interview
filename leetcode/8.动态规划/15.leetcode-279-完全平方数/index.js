//24-9-8 第一次学习

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;

    //i*i就是完全平方数，也就是物品
    for(let i = 1; i * i <=n; i++) {
        for(let j = i * i; j <=n; j++) {
            dp[j] = Math.min(dp[j], dp[j - i*i] + 1);
        }
    }

    return dp[n];
};

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = Array(n+1).fill(Infinity);
    dp[0] = 0;

    for(let i = 1; i * i <= n; i++) {
        for(let j = i * i; j <=n; j++) {
            dp[j] = Math.min(dp[j],dp[j - i*i] + 1)
        }
    }

    return dp[n]
};