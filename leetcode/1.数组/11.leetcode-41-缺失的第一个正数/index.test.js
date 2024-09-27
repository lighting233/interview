/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    const len = nums.length;

    for(let i = 0; i < len; i++) {
        while(nums[i] > 0 && nums[i] <= len && nums[nums[i] - 1] !== nums[i]) {
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]]
        }
    };

    for(let i = 0; i < len; i++) {
        //todo i + 1
        if(nums[i] - 1 !== i) return i + 1;
    };

    return len + 1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {

};