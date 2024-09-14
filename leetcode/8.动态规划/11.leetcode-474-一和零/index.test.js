/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    const dp = Array(m+1).fill(0).map(() => Array(n+1).fill(0));

    for(let str of strs) {
        let zeroNum = 0, oneNum = 0;
        for(let char of str) {
            if(char === '0') {
                zeroNum++;
            }else {
                oneNum++;
            }
        };

        for(let i = m; i >= zeroNum; i--) {
            for(let j = n; j>= oneNum; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1)
            }
        }
    };

    return dp[m][n]
};

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {

};

