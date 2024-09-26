//24-9-25 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    //其中慢指针表示处理出的数组的长度(即slow处于当前处理完的元素下标加1的位置)，快指针表示已经检查过的数组的长度
    if (nums.length <= 2) return nums.length;
    let slow = fast = 2;

    while (fast < nums.length) {
        if (nums[slow - 2] !== nums[fast]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }

    return slow
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums.length <= 2) return nums.length;
    let left = right = 2;

    while (right < nums.length) {
        //todo if,每走一步对比一次
        // while(nums[right] !== nums[left - 2]) {
        if (nums[right] !== nums[left - 2]) {
            nums[left] = nums[right];
            left++;
        };
        right++;
    };

    return left;
};