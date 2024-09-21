/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let res = 0;
    const stack = [];
    let len = height.length;

    for(let i = 0; i < len; i++) {
        while(stack.length && height[stack.at(-1)] < height[i]) {
            const curIdx = stack.pop();
            if(stack.length === 0) break;
            const leftIdx = stack.at(-1);

            const top = Math.min(height[leftIdx], height[i]) - height[curIdx];
            const weight = i - leftIdx - 1;

            res+= top*weight;
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