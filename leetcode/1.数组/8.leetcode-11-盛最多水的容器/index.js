//24-9-23 第一次学习

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
//若向内 移动短板 ，水槽的短板 min(h[i],h[j]) 可能变大，因此下个水槽的面积 可能增大 。
    //若向内 移动长板 ，水槽的短板 min(h[i],h[j])​ 不变或变小，因此下个水槽的面积 一定变小 。
    let left = 0, right = height.length - 1;
    let res = 0;

    while(left < right) {
        const area = Math.min(height[left],height[right]) * (right - left);
        res = Math.max(area,res);

        if(height[left] > height[right]) {
            right--;
        }else {
            left++;
        }
    };

    return res;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let res = 0;
    let left = 0, right = height.length - 1;

    while(left < right) {
        const area = (right - left) * Math.min(height[left], height[right]);
        res = Math.max(res,area);

        if(height[left] > height[right]) {
            right--;
        }else {
            left++;
        }
    };

    return res;
};