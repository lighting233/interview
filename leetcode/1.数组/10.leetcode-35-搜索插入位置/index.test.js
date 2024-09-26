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
        }else if(nums[mid] < target) {
            left = mid + 1;
        }else {
            right = mid;
        }
    };

    return target > nums[right] ? right + 1 : right;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {

};