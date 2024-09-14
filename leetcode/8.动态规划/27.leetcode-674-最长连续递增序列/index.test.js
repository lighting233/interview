/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    const len = nums.length;

    const dp = Array(len).fill(1);

    for(let i = 1; i < len; i++) {
        if(nums[i] > nums[i - 1]) {
            //todo dp[i - 1]
            // dp[i] = dp[i] + 1;
            dp[i] = dp[i  -1] + 1;
        }
    };

    return Math.max(...dp)
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {

};
