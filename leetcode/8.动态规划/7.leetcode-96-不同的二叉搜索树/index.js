//24-9-2 第一次学习

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    //dp[i],有 dp[i]种不同的二叉树
    const dp = Array(n+1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for(let i = 2; i <=n; i++) {
        for(let j = 1; j <= i; j++) {
            dp[i]+=dp[j - 1] * dp[i - j];
        };
    };

    return dp[n];
};
// numTrees(3);

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {

};