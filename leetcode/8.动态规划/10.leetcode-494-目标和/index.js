//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    const sum = nums.reduce((a,b) => a + b);
    //说明 left 为小数
    if((sum + target) % 2) return 0;
    //num为非零正整数
    if(Math.abs(target) > sum) return 0;
    const left = (sum + target) / 2;

    const dp = Array(left + 1).fill(0);
    dp[0] = 1;

    for(let i = 0; i < nums.length; i++) {
        for(let j = left; j >= nums[i]; j--) {
            dp[j] = dp[j] + dp[j - nums[i]];
        }
    }
    
    return dp[left];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    const sum = nums.reduce((p,c) => p + c,0);
    if((sum + target) % 2) return 0;
    //todo 
    if(Math.abs(target) > sum) return 0;
    const left = (sum + target) / 2;

    const dp = Array(left + 1).fill(0);
    dp[0] = 1;
    for(let i = 0; i < nums.length; i++) {
        for(let j = left; j >= nums[i]; j--) {
            dp[j] = dp[j] + dp[j - nums[i]]
        }
    }

    return dp[left];
};