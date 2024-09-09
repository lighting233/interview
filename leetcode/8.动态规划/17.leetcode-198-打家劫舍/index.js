//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    //如果当前元素的前一个被偷了，那么这个元素不能偷，但是下一个元素可以选择偷或者不偷
    //dp[i]表示当前下标 i 能偷取的最大值
    //dp[nums.length - 1]时的取值不一定是偷最后一个元素，因为也可能是偷前一个元素的价值最大
    //所以 dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    const dp = Array(nums.length).fill(0);
    dp[0] = nums[0];
    if(nums.length === 1) return dp[0];
    dp[1] = Math.max(nums[0],nums[1]);

    for(let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    };

    return dp[nums.length - 1];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {

};