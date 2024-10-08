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
    const len = nums.length;
    const res = Array(len).fill(-1);

    const stack = [];
    for(let i = 0;i < 2 * len; i++) {
        //todo 不是除 2，而是 len
        // while(stack.length && nums[stack.at(-1)] < nums[i % 2]) {
        while(stack.length && nums[stack.at(-1)] < nums[i % len]){
            const idx = stack.pop();
            res[idx] = nums[i % len];
        };

        stack.push(i % len)
    };

    return res;
};