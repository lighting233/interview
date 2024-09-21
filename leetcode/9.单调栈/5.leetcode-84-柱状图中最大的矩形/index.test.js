/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    heights = [-1, ...heights, -1];
    let res = 0;
    const stack = [];

    for(let i = 0; i < heights.length; i++) {
        while(stack.length && heights[stack.at(-1)] > heights[i]) {
            const curIdx = stack.pop();
            const leftIdx = stack.at(-1);

            const area = (i - leftIdx - 1) * heights[curIdx];
            res = Math.max(area,res);
        };
        stack.push(i)
    };

    return res;
};

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {

};