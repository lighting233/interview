//24-9-16 第一次学习

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let res = 0;

    const stack = [];
    heights = [-1, ...heights, -1];
    for(let i = 0; i < heights.length; i++) {
        while(stack.length > 0 && heights[stack.at(-1)] > heights[i]) {
            const idx = stack.pop();
            //todo 还需要求当前元素能延伸到左边的范围
            //todo stack[stack.length - 1] 不会越界的原因是我们在 heights 数组的两端添加了哨兵 -1
            const weight = (i - stack.at(-1) - 1)
            const area = weight * heights[idx];
            res = Math.max(res,area);
        };
        stack.push(i);
    };

    return res;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {

};