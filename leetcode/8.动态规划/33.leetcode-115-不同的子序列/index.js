//24-9-5 第一次学习

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    //思路，就是求 s 中有多少种删除字符的方法，使得删除后 s 和 t 相等
    //dp[i][j]以 i - 1 结尾的 s 中有多少个删除字符得到t - 1结尾的 t 的方法数
    const [m, n] = [s.length, t.length];
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    //初始化，从左上和上推出，所以初始化第一行，第一列
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 1;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                //s = bagg, t = bag
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            } else {
                //不考虑dp[i][j - 1]是因为在 s 中删除
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    return dp[m][n]
};

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    const [m,n] = [s.length,t.length];
    const dp = Array(m+1).fill(0).map(() =>Array(n+1).fill(0));

    for(let i = 0; i <= m; i++) {
        dp[i][0] = 1;
    }

    for(let i = 1; i <=m;i++) {
        for(let j = 1; j <=n; j++) {
            if(s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            }else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    return dp[m][n];
};