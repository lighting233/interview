/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    const len = s.length;
    const dp = Array(len).fill(0).map(() => Array(len).fill(0));

    //todo i === j时， i 和 i+1相等的情况被包含在递推公式里了,不初始化的话,'aaa',i = 0, j = 2时只能推导出最大长度是2
    for (let i = 0; i < len; i++) {
        dp[i][i] = 1;
    }

    for (let i = len - 1; i >= 0; i--) {
        //todo i === j 的话递推公式会越界dp[i][j - 1]
        // for (let j = i; j < len; j++) {
        for (let j = i + 1; j < len; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                //todo dp[i][j - 1]和dp[i + 1][j]是由同行从左到右或者同列从下到上推出来的,这个长度之前已经推导过了
                // dp[i][j] = Math.max(dp[i][j - 1] + 1, dp[i + 1][j] + 1)
            }
        }
    }
    //todo o - len-1
    // return dp[len - 1][len - 1];
    return dp[0][len - 1]
};
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {

};
