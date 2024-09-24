//24-9-22 第一次学习

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
//从头开始遍历,把遇到的每个数值nums[i]在[1,len]区间的正数放入i - 1的位置
    //如果交换回来的数依旧是正数,则继续处理,遇到不是正整数不用处理,往后进一
    //全部处理完成,再遍历数组,数值-1不等于下标的,就是第一个缺失的正数
    //如果全部遍历完成,还没返回说明正数是len+1位的数字

    for(let i = 0; i < nums.length; i++) {
        //todo 数组中可能会有重复的值,如果判断nums[i] - 1 !== i,当nums[i]-1的位置上已经放了nums[i]的数据，无需换入,应该跳过这一步
        //否则会进入无限循环中
        //使用nums[nums[i] - 1] != nums[i]来判断,当前元素应该放入的目标位是不是已经放入正确的数值了
        // while(nums[i] >= 1 && nums[i] <= nums.length && nums[i] - 1 !== i) {
        while(nums[i] >= 1 && nums[i] <= nums.length && nums[nums[i] - 1] !== nums[i]) {
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]]
        };
    };
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] - 1 !== i) return i + 1;
    };
    return nums.length + 1
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {

};