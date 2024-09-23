//24-9-22 第一次学习

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
            let l = mid;
            while(l >= 0 && nums[l] ===target) {
                l--;
            };
            let r = mid;
            while(r <= nums.length - 1 && nums[r] ===target) {
                r++;
            };
            return [l+1,r - 1];
        }else if(nums[mid] < target) {
            left = mid + 1;
        }else {
            right = mid - 1;
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