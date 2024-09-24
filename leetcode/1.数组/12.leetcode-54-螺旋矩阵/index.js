//24-9-24 第一次学习

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const res = [];
    let left = 0, right = matrix[0].length - 1, top = 0, bottom = matrix.length - 1;

    //才能形成一环
    while(left < right && top < bottom) {
        for(let j = left; j < right; j++) {
            res.push(matrix[top][j]);
        };
        for(let i = top; i < bottom; i++) {
            res.push(matrix[i][right]);
        };
        for(let j = right; j > left; j--) {
            res.push(matrix[bottom][j])
        };
        for(let i = bottom; i > top; i--) {
            res.push(matrix[i][left]);
        };
        left++;
        right--;
        top++;
        bottom--;
    };

    if(top === bottom) {
        for(let j = left; j <= right; j++) {
            res.push(matrix[top][j]);
        }
    }else if(left === right) {
        for(let i = top; i <= bottom; i++) {
            res.push(matrix[i][left])
        }
    };

    return res;
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {

};