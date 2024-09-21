/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const [m, n] = [word1.length, word2.length];
    const dp = Array(m + 1).fill(Infinity).map(() => Array(n + 1).fill(Infinity));
    for(let i = 0; i <= m; i++) {
        dp[i][0] = i;
    };
    for(let j = 0; j <= n; j++) {
        dp[0][j] = j;
    };

    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }else {
                dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i - 1][j] + 1)
            }
        }
    }
    
    return dp[m][n];
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {

};
