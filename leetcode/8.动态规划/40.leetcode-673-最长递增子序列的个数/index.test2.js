/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
    //dp[i]：范围是[0, i]的回文子串，最少分割次数是dp[i]。
    //如果 j 在[0,i]之间作为切割点，那么区间[0,j]的最小切割次数是 dp[j]
    //区间[j+1,i]如果是回文的话，则dp[i] = dp[j] + 1
    //所以递推公式为dp[i] = Math.min(dp[i],dp[j] + 1)
    const len = s.length;

    //记录各个区间哪段是回文
    const isHuiWen = Array(len).fill(false).map(() => Array(len).fill(false));

    for (let i = len - 1; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1 || isHuiWen[i + 1][j - 1]) {
                    isHuiWen[i][j] = true;
                }
            }
        }
    };

    const dp = Array(len).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i < len; i++) {
        //直接就是回文的话不用分割
        if (isHuiWen[0][i]) {
            dp[i] = 0;
            continue;
        }
        for (let j = 0; j < i; j++) {
            //是回文的话才能用递推公式
            if (isHuiWen[j + 1][i]) {
                dp[i] = Math.min(dp[i], dp[j] + 1)
            }
        }
    };
    return dp[len - 1];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {

};