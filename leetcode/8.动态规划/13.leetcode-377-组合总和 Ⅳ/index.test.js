/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    const dp = Array(target + 1).fill(0);
    dp[0] = 1;
    for(let j = 0; j <= target; j++) {
        for(let i = 0; i < nums.length; i++) {
            //todo 物品小于背包
            // if(nums[i] >= j) {
            if(nums[i] <= j) {
                dp[j] = dp[j] + dp[j - nums[i]]
            }else {
                dp[j] = dp[j]
            }
        }
    };

    return dp[target];
};

/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var combinationSum4 = function (nums, target) {

};

