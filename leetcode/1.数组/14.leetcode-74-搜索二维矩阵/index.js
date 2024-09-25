//24-9-25 第一次学习

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const [m, n] = [matrix.length, matrix[0].length];
    let left = 0, right = m * n - 1;

    while(left <= right) {
        const mid = left + ((right - left) >> 1);
        let row = Math.floor(mid / n);
        let col = mid % n;

        if(matrix[row][col] === target) {
            return true;
        }else if(matrix[row][col] < target) {
            left = mid + 1;
        }else {
            right = mid - 1;
        }
    };

    return false;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {

};