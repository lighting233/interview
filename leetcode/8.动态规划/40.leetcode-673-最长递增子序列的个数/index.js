//24-9-18 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
    //dp[i] 以当前元素结尾的最长递增子序列的长度
    //count[i]：以nums[i]为结尾的字符串，最长递增子序列的个数为count[i];

    const len = nums.length;
    const dp = Array(len).fill(1);
    const count = Array(len).fill(1);
    let maxLen = 1;

    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (dp[i] === dp[j]) {
                    dp[i] = dp[j] + 1;
                    //当前下标最长子序列的个数继承 j
                    count[i] = count[j]
                } else if (dp[i] === dp[j] + 1) {
                    //说明多了一种下标不同，但是长度相同的情况
                    //[1,3,5,7]的时候dp[4] = 4,[1,3,4]的时候 dp[j] === 3,加 1 等于dp[4]
                    count[i] = count[i] + count[j]
                }
            }
        };
        maxLen = Math.max(maxLen, dp[i])
    };

    let res = 0;
    for (let i = 0; i < len; i++) {
        if (maxLen === dp[i]) {
            res += count[i]
        }
    };

    return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {

};