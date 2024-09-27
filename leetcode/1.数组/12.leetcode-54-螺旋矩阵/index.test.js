/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length];
    let top = 0, right = n - 1, bottom = m - 1, left = 0;
    const res = [];
    while (top < bottom && left < right) {
        for (let j = left; j < right; j++) {
            res.push(matrix[top][j]);
        };
        for (let i = top; i < bottom; i++) {
            res.push(matrix[i][right]);
        };
        for (let j = right; j > left; j--) {
            res.push(matrix[bottom][j]);
        };
        for (let i = bottom; i > top; i--) {
            res.push(matrix[i][left]);
        };
        left++;
        right--;
        top++;
        bottom--;
    };

    if (top === bottom) {
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        }
    } else if (left === right) {
        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][left]);
        }
    };

    return res;
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {

};