//24-9-4 第一次学习

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
    //dp[i]: 对 i 进行拆分，拆分后最大的乘积为 dp[i]
    //一个数拆分拆分成多个近似相等的数会越趋近最大值，例如 100，最差的情况是 50x50, < 33x33x34 < 25x25x25x25 < 20x20x20x20x20,所以 60x40 这种情况没有必要拆
    const dp = Array(n + 1).fill(0);
    dp[2] = 1;

    for(let i = 3; i <= n; i++) {
        for(let j = 1; j < i; j++) {
            //例如 i = 3 时，1*2 > 1 * (dp[3 - 1] === 1),所以需要j * (i - j)
            //j = 2的情况其实应该舍弃掉，因为不需要比较 j > i/2的情况
            dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i])
        }
    }
    return dp[n];

};

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
    const dp = Array(n + 1).fill(0);
    dp[2] = 1;

    for(let i = 3; i <= n; i++) {
        for(let j = 1; j <= i / 2; j++) {
            //例如 i = 3 时，1*2 > 1 * (dp[3 - 1] === 1),所以需要j * (i - j)
            //j = 2的情况其实应该舍弃掉，因为不需要比较 j > i/2的情况
            dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i])
        }
    }
    return dp[n];
};