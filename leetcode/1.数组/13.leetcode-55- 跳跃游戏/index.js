//24-9-24 第一次学习

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let max = nums[0];

    for(let i = 0; i <= max; i++) {
        max = Math.max(i + nums[i], max);
        if(max >= nums.length - 1) return true;
    };

    return false;
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {

};