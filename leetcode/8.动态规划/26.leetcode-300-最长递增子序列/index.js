//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    //dp[i] 以当前元素结尾的最长递增子序列的长度
    const len = nums.length;
    const dp = Array(len).fill(1);
    let res = 1;
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        };
        res = Math.max(res, dp[i])
    };

    return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {

};