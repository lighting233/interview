/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for(let i = 1; i * i <= n; i++) {
        //todo 背包大于物品
        // for(let j = 1; j <= n; j++) {
        for(let j = i* i; j <= n; j++) {
            dp[j] = Math.min(dp[j], dp[j - i * i] + 1)
        }
    };

    return dp[n]
};

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {

};

