//24-9-15 第一次学习

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    //dp[i][j]以[i,j]这个范围内的回文子序列的长度为dp[i][j]
    const len = s.length;
    const dp = Array(len).fill(0).map(() => Array(len).fill(0));

    for(let i = 0; i < len; i++) {
        //i === j时， i 和 i+1相等的情况被包含在递推公式里了
        dp[i][i] = 1;
    }
   
    for(let i = len - 1; i >= 0; i--) {
        //j = i+1,等于 i 的情况初始化过了，i == j 的话递推公式会越界dp[i][j - 1]
        for(let j = i + 1; j < len; j++) {
            if(s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2
            }else {
                //不相同分别考虑每个元素 aab
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[0][len - 1]
};
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {

};