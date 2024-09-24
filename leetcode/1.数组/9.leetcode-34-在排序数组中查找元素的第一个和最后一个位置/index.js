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
    let left = 0, right = nums.length - 1;

    while(left <= right) {
        const mid = left + ((right - left) >> 1);

        if(nums[mid] === target) {
            left = mid;
            while(left - 1 >= 0 && nums[left - 1] === target) {
                left--;
            };
            right = mid;
            while(right + 1 < nums.length && nums[right + 1] === target) {
                right++;
            };
            return [left,right];
        }else if(nums[mid] > target) {
            right = mid - 1;
        }else {
            left = mid + 1;
        }
    };

    return [-1,-1];
};