 //24-8-11 第二次测试

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(target, nums) {
    let minLen = Infinity;
    let start = 0;
    let sum = 0;
    for(let end = 0; end < nums.length; end++) {
        sum+=nums[end];

        while(sum >= target) {
            minLen = Math.min(end - start + 1, minLen);
            sum-=nums[start];
            start++;
        };
    }

    return minLen === Infinity ? 0 : minLen;
 };