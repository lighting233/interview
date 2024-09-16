//24-9-16 第一次学习

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const res = Array(temperatures.length).fill(0);
    const stack = [];

    for(let i = 0; i < res.length; i++) {
        while(stack.length && temperatures[stack.at(-1)] < temperatures[i]) {
            const idx = stack.pop();
            res[idx] = i - idx;
        };
        //todo 存下标
        stack.push(i)
    };

    return res;
};

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {

};