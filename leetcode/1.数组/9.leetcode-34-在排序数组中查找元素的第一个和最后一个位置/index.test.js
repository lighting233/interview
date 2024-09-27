/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let left = 0, right = nums.length - 1;

    while(left <= right) {
        const mid = left + ((right - left) >> 1);
        if(nums[mid] === target) {
            let left = mid;
            while(left >= 0 && nums[left] === target) {
                left--;
            };
            let right = mid;
            while(right < nums.length && nums[right] === target) {
                right++;
            };
            return [left + 1, right - 1];
        }else if(nums[mid] > target) {
            right = mid - 1;
        }else {
            left = mid + 1;
        }
    };

    return [-1,-1];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {

};