//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    if(nums.length === 1) return nums[0];
    
    function range(nums,start,end) {
        if(start === end) return nums[start];
        const dp = Array(nums.length).fill(0);
        dp[start] = nums[start];
        dp[start + 1] = Math.max(nums[start],nums[start + 1]);

        for(let i = start+2; i<=end; i++) {
            dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
        }

        return dp[end];
    }

    const res1 = range(nums,0,nums.length - 2);
    const res2 = range(nums, 1, nums.length - 1);

    return Math.max(res1,res2);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {

};