//24-9-16 第一次学习

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    const res = Array(nums.length).fill(-1);
    const stack = [];

    for(let i = 0; i < nums.length * 2; i++) {
        while(stack.length && nums[stack.at(-1)] < nums[i % nums.length]) {
            const idx = stack.pop();
            res[idx] = nums[i % nums.length];
        };
        stack.push(i % nums.length)
    };

    return res;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {

};