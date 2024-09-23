//24-9-24 第一次学习

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0, right = nums.length;

    while(left < right) {
        const mid = left + ((right - left) >> 1);
        if(nums[mid] === target) {
            return mid;
        }else if(nums[mid] > target) {
            right = mid;
        }else {
            left = mid + 1;
        }
    };

    return target > nums[right] ?  right + 1: right;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {

};