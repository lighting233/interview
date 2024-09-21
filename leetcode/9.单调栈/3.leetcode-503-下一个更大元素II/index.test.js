/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    const len = nums.length;
    const res = Array(len).fill(-1);
    const stack = [];
    for(let i = 0; i < 2 * len; i++) {
        while(stack.length && nums[stack.at(-1)] < nums[i % len]) {
            const idx = stack.pop();
            res[idx] =  nums[i % len]
        };
        stack.push(i % len)
    };
    return res;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {

};