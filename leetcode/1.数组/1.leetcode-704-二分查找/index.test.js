//24-8-10 第二次测试
/**
* 左闭右闭
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var search = function (nums, target) {
    //1.判空
    if (nums.length === 0) return -1;
    //2.定义区间左闭右闭
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            //应为定义的左闭右闭，所以不包含mid,如果包含在极端情况下如[3,3],target = 6时，死循环
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }

    //4.
    return -1;
};

/**
* 左闭右开
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var search = function (nums, target) {
    //1.判空
    if (nums.length === 0) return -1;
    //2.定义区间左闭右开
    let left = 0, right = nums.length;

    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            //应为定义的左闭右开，所以right=mid 不被循环进去
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }

    //4.
    return -1;
};