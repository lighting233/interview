/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    let area = 0;
    const len = height.length;
    const stack = [0];
    for(let i = 1; i < len; i++) {
        while(stack.length > 1 && height[stack.at(-1)] < height[i]) {
            const midIdx = stack.pop();
            console.log('%c 🦑 midIdx: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', midIdx);
            const leftIdx = stack.at(-1);
            const absHigh = Math.min(height[i], height[leftIdx]) - height[midIdx];
            console.log('%c 🧀 absHigh: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', absHigh);
            const width = i - leftIdx - 1;
            console.log('%c 🍸 width: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', width);
            area += absHigh * width;
            console.log('%c 🍩 area: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', area);
        };
        stack.push(i);
    }
    return area;
};

trap([0,1,0,2,1,0,1,3,2,1,2,1]
    )