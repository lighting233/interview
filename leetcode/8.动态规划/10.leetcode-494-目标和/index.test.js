/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    const sum = nums.reduce((p, c) => p + c, 0);
    if ((sum + target) % 2) return 0;
    if (Math.abs(target) > sum) return 0;
    const amount = (sum + target) / 2;

    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (let i = 0; i < nums.length; i++) {
        for (let j = amount; j >= nums[i]; j--) {
            //todo 方法数，不加 nums[i]
            // dp[j] = dp[j] + dp[j - nums[i]] + nums[i];
            dp[j] = dp[j] + dp[j - nums[i]];
        }
    };

    return dp[amount];
};

/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var findTargetSumWays = function (nums, target) {
    const sum = nums.reduce((a, b) => a + b);
    //todo 0
    // if (sum < Math.abs(target)) return -1;
    if (sum < Math.abs(target)) return 0;
    if((target + sum) % 2) return 0;
    const left = (target + sum) / 2;

    const dp = Array(left + 1).fill(0);
    dp[0] = 1;

    for(let i = 0; i < nums.length; i++) {
        for(let j = left; j >= nums[i]; j--) {
            dp[j]+=dp[j - nums[i]];
        }
    };

    return dp[left];
};

