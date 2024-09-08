//24-9-5 第一次学习

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    //本题相当于求排列，先遍历物品，再遍历背包，相当于组合数，因为先放物品是按顺序放的，只会出现【物品 1，物品 2】，不会出现【物品 2，物品 1】
    //如果先遍历背包后遍历物品，那么外层循环先固定背包大小j，然后在大小为j的背包中循环遍历添加物品，然后在下次外层循环背包大小变为j+1，
    //此时仍要执行内层循环遍历添加物品，也就会出现在上一轮外层循环中添加coins【2】的基础上还能再添加coins【1】的情况，那么就有了coins【1】在coins【2】之后的情况了。
    const dp = Array(target + 1).fill(0);
    dp[0] = 1;

    for(let j = 0; j <= target; j++) {
        for(let num of nums) {
            if(j >= num) {
                dp[j] = dp[j] + dp[j - num]
            }
        }
    }

    return dp[target];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {

};