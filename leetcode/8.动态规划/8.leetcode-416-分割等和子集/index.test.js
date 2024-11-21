/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const sum = nums.reduce((a,b) => a+b);
    if(sum % 2) return false;
    const target  = sum / 2;
    const dp = Array(target + 1).fill(0);

    for(let i = 0; i < nums.length; i++) {
        for(let j = target; j >= nums[i]; j--) {
            //todo
            // dp[i] = Math.max(dp[i], dp[i - j] + nums[i]);
            // if(dp[i] === target) {
            //     return true;
            // }
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
            if(dp[j] === target) {
                return true;
            }
        }
    };

    return false;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {

};

