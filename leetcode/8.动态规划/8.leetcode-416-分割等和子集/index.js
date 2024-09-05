//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const sum = nums.reduce((p,c) => p + c, 0);
    if(sum % 2) return false;
    const target = sum / 2;

    //todo target+1
    const dp = Array(target + 1).fill(0);

    for(let i = 0; i < nums.length; i++) {
        //todo 背包的容量要大于物品的重量
        for(let j = target; j >= nums[i]; j--) {
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