//24-9-5 第一次学习

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    //dp[i][j]装满 i 个 0，j 个 1 这么大容量的背包，最多装了多少了物品
    const dp = Array(m+1).fill(0).map(() => Array(n+1).fill(0));
    //每个物品的重量是 x 个 0，y 个 1，所以物品数量是dp[i - x][j - y] + 1，最大值就是和自身取一个最大值

    //遍历物品
    for(let str of strs) {
        let zeroNum = 0, oneNum = 0;

        for(let char of str) {
            if(char === '0') {
                zeroNum++;
            }else {
                oneNum++;
            }
        };

        //遍历背包
        for(let i = m; i >= zeroNum; i--) {
            for(let j = n; j >= oneNum; j--) {
                dp[i][j] = Math.max(dp[i][j],dp[i - zeroNum][j - oneNum] + 1)
            }
        }
    }

    return dp[m][n]
};

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
            for(let j = n; j >= oneNum; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1);
            }
        }
    }

    return dp[m][n]
};