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
    const res = [];
    const [m,n] = [matrix.length, matrix[0].length];
    let left = 0, right = n - 1, top = 0, bottom = m - 1;

    while(left < right && top < bottom) {

        for(let j = left; j < right; j++) {
            res.push(matrix[top][j]);
        };
        for(let i = top; i < bottom; i++) {
            res.push(matrix[i][right]);
        };
        for(let j = right; j > left; j--) {
            res.push(matrix[bottom][j]);
        };
        for(let i = bottom; i > top; i--) {
            res.push(matrix[i][left]);
        };

        left++;
        right--;
        top++;
        bottom--;
    };

    //todo matrix = [[2,5],[8,4],[0,-1]]时,走了一圈后,left > right但是top === bottom,如果这样判断会多加一个值
    // if(left < right) {
    if(top === bottom){
        for(let j = left; j <= right; j++) {
            res.push(matrix[top][j]);
        }
    // }else {
    }else if(left === right){
        for(let i = top; i <= bottom; i++) {
            res.push(matrix[i][left])
        }
    }

    return res;
};