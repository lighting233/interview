//24-9-5 第一次学习

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const len = prices.length;

    const dp = Array(len).fill(0).map(() => Array(4).fill(0));
    dp[0][0] = -prices[0];
    dp[0][2] = -prices[0];

    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] - prices[i]);
        dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] + prices[i]);
    };

    return Math.max(dp[len - 1][1],dp[len - 1][3])
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const len = prices.length;
    const dp = Array(len).fill(0).map(() => Array(4).fill(0));
    dp[0][0] = -prices[0];
    dp[0][2] = -prices[0];

    for(let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] - prices[i]);
        dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] + prices[i]);
    };

    //todo 如果第一次卖出已经是最大值了，那么我们可以在当天立刻买入再立刻卖出。所以dp[4][4]已经包含了dp[4][2]的情况。也就是说第二次卖出手里所剩的钱一定是最多的。
    return Math.max(dp[len - 1][1],dp[len - 1][3])
};