//24-9-22 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
//一个指针 i 进行数组遍历，另外一个指针 j 指向有效数组的最后一个位置。
    //只有当 i 所指向的值和 j 不一致（不重复），才将 i 的值添加到 j 的下一位置。

    if(nums.length === 1) return nums;
    let i = 0;
    let j = 0;

    while(i < nums.length) {
        if(nums[i] !== nums[j]) {
            nums[j + 1] = nums[i];
            j++;
        }
        i++;
    };

    return j+1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {

};