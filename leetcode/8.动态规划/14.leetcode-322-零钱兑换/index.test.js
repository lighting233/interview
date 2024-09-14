/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    //todo 求的是最小硬币个数
    // const dp = Array(amount + 1).fill(0);
    const dp = Array(amount + 1).fill(Infinity);
    //todo 初始化，凑成容量为零需要 0 个
    dp[0] = 0;

    for(let i = 0; i < coins.length; i++) {
        for(let j = coins[i]; j <= amount; j++) {
            //todo 求的是最小的
            // dp[i] = dp[i] + dp[i - coins[i]] + 1;
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
        }
    };

    //todo
    // return dp[amount];
    return dp[amount] === Infinity ? -1 : dp[amount];
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {

};

