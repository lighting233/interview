var findLengthOfLCIS = function(nums) {
    const dp = new Array(nums.length).fill(1);

    for(let i = 1; i < nums.length; i++) {
        if(nums[i] > nums[i - 1]) {
            dp[i] = dp[i - 1] + 1;
        }
    }
    console.log(dp)
    console.log(Math.max(...dp))
    return Math.max(...dp)
};

findLengthOfLCIS([1,3,5,4,7])