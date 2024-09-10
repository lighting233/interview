//24-9-5 第一次学习

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const len = prices.length;
    //dp[i][0]第 i 天持有股票所获得最大利润 dp[i][1]第 i 天不持有股票的状态所获的最大利润
    //不能表示当天买入或卖出的状态，如果表示第 i 天卖出，那么第 i+1 天需要有什么都不操作的状态，当天卖出的状态，当天买入的状态
    const dp = Array(len).fill(0).map(() => Array(2).fill(0));
    dp[0][0] = -prices[0];

    for(let i = 1; i < len; i++) {
        //todo 只能买一次，所以买入就直接是-prices[i]
        dp[i][0] = Math.max(dp[i - 1][0], - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i])
    };

    return dp[len - 1][1]
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const dp = Array(prices.length).fill(0).map(() => Array(2).fill(0));
    dp[0][0] = -prices[0];

    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
    };

    return dp[prices.length - 1][1];
};