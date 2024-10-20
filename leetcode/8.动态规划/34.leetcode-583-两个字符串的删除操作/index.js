//24-9-5 第一次学习

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const [m, n] = [word1.length, word2.length];
    //dp[i][j]以 i - 1 为下标的 word1 和以 j - 1 为下标word2，删除元素相等所需要的步骤
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    //初始化，从左上和上推出，所以初始化第一行，第一列
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                //dp[i - 1][j - 1] + 2已经包含在之前的情况中了
                //例如dp[i][j - 1]如果考虑删除 i 的话,就是(dp[i - 1][j - 1] + 1)+1
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1)
            }
        }
    }

    return dp[m][n]
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const [m,n] = [word1.length, word2.length];
    const dp = Array(m+1).fill(0).map(() =>Array(n+1).fill(0));

    for(let i = 0; i <=m;i++) {
        dp[i][0] = i;
    };

    for(let j = 0; j <=n;j++) {
        dp[0][j] = j;
    };

    for(let i = 1; i <=m;i++) {
        for(let j = 1; j <=n; j++) {
            if(word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            }else {
                dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
            }
        }
    }

    return dp[m][n];
};