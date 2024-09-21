/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
    //dp[i]以下标为i的最长递增子序列长度
    //count[i]以下标为i时的最长递增子序列长度的个数
    let maxLen = 1;
    const len = nums.length;
    const dp = Array(len).fill(1);
    const count = Array(len).fill(1);

    for(let i = 1; i < len; i++) {
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                if(dp[j] === dp[i]) {
                    dp[i] = dp[j] + 1;
                    count[i] = count[j]
                    //todo dp[j]的长度正好比dp[i]小1时,nums[i] > nums[j],说明又找了到了长度和dp[i]一样的一个组合
                // }else if(dp[j] === dp[i] + 1) {
                    // dp[i] = dp[j];
                }else if(dp[j] + 1 === dp[i]) {
                    count[i] = count[i] + count[j];
                }
            }
        }
        maxLen = Math.max(dp[i],maxLen);
    };

    let res = 0;
    for(let i = 0; i < len; i++) {
        if(maxLen === dp[i]) {
            res+=count[i]
        }
    };

    return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {

};
