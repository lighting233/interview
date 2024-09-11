//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    //dp[i] 以当前元素结尾的最长连续递增子序列的长度
    const len = nums.length;
    const dp = Array(len).fill(1);
    let res = 1;
    for (let i = 1; i < len; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = dp[i - 1] + 1;
        }
        res = Math.max(res, dp[i])
    };

    return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {

};