//24-9-11 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const len = nums.length;
    const dp = Array(len).fill(0);
    dp[0] = nums[0];
    let res = dp[0];
    for(let i = 1; i < len; i++) {
        //todo dp[i] = dp[i - 1] + nums[i]和nums[i]取最大值，是当前元素结尾形成连续子序列的最大和
        //todo [-2,1,-3,4,-1,2,1,-5,4]比如元素是-1 时，不是取-1，而是 3 是最大值
        // if(dp[i - 1] + nums[i] > dp[i]) {
        //     dp[i] = dp[i - 1] + nums[i];
        // }else {
        //     dp[i] = nums[i]
        // };
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
        res = Math.max(dp[i], res);
    };

    return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {

};