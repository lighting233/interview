/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxPosition = 0;

    for(let i = 0; i <= maxPosition; i++) {
        maxPosition = Math.max(i + nums[i], maxPosition);
        if(maxPosition >= nums.length - 1) return true;
    };

    return false;
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {

};