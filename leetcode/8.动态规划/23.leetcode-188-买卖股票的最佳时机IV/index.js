//24-9-5 第一次学习

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    const len = prices.length;
    const dp = Array(len).fill(0).map(() => Array(2*k).fill(0));
    //todo 2 * k
    for(let j = 0; j < 2* k; j+=2) {
        dp[0][j] = -prices[0];
    }

    for(let i = 1; i < len; i++) {
        //todo 2 * k
        for(let j = 0; j < 2 * k; j+=2) {
            //todo 判断第一次持有和后续持有
            dp[i][j] = Math.max(dp[i - 1][j], j > 0 ? dp[i - 1][j - 1]- prices[i] : -prices[i]);
            dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] + prices[i]);
        }
    };

    return dp[len - 1][2*k - 1]
};

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {

};