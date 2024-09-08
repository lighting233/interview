//24-9-5 第一次学习

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    //不能初始化成 0，不然每次 min 都为 0
    // const dp = Array(amount + 1).fill(0);
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for(let coin of coins) {
        for(let j = coin; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coin] + 1)
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {

};