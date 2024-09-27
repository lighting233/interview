/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let res = 0;

    while(left < right) {
        const weight = right - left;
        const h = Math.min(height[left],height[right]);
        const area = h * weight;
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

};