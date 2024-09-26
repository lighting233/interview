/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;

    while(left <= right) {
        const mid = left + ((right - left) >> 1);

        if(nums[mid] === target) {
            return mid;
        }else if(nums[mid] < nums[right]) {
            if(target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            }else {
                right = mid - 1;
            }
        }else {
            if(target >= nums[left] && nums[mid] > target) {
                right = mid - 1;
            }else {
                left = mid + 1;
            }
        }
    };

    return -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

};