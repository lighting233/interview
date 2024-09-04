//24-9-4 第一次学习

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    //dp[i]表示爬到第 i 阶所需要花费的最小费用
    const len = cost.length
    const dp = new Array(len + 1).fill(0);
    dp[1] = 0;
    dp[2] = Math.min(cost[0], cost[1]);

    for (let i = 3; i <= len; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }

    return dp[len];
};

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {

};