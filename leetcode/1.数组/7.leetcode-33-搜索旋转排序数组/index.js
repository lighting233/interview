//24-9-22 第一次学习

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;

    while(left <= right) {
        const midIdx = left + ((right - left) >> 1);
        const midVal = nums[midIdx];

        if(midVal === target) {
            return midIdx;
            //右边有序
        } else if(midVal < nums[right]) {
            //有序不代表target就落在右区间里,target > midVal也可能target落在左区间里
            if(target > midVal && target <= nums[right]) {
                left = midIdx + 1;
            }else {
                right = midIdx - 1;
            }
            //左边有序
        } else {
            if(target < midVal && nums[left] <= target) {
                right = midIdx - 1;
            }else {
                left = midIdx + 1;
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