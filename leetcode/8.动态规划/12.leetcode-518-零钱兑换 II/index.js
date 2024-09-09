//24-9-8 第一次学习

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (let coin of coins) {
        //todo 需要判断 j >= coin
        for (let j = coin; j <= amount; j++) {
            // if (j >= coin) {
            //     dp[j] = dp[j] + dp[j - coin];
            // } else {
            //     dp[j] = dp[j]
            // }
            dp[j] = dp[j] + dp[j - coin];
        }
    };

    return dp[amount]
};

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    const dp = Array(amount+1).fill(0);
    dp[0] = 1;

    //todo 完全背包求组合数
    for(let i = 0; i < coins.length; i++) {
        for(let j = coins[i]; j <= amount; j++) {
            dp[j] = dp[j] + dp[j - coins[i]]
        }
    }
    

    return dp[amount];
};