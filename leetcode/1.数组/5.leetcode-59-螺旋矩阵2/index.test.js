 //24-8-11 第二次测试

/**
 * @param {number} n
 * @return {number[][]}
 */
 var generateMatrix = function(n) {
    const res = Array(n).fill(0).map(() => Array(n).fill(0));
    let startX = startY = 0;
    let loop = Math.floor(n / 2);
    let offset = 1;
    let count = 1;

    while(loop--) {
        let i = startX, j = startY;

        for(; j < n - offset;j++) {
            res[i][j] = count++;
        };
        for(; i < n - offset; i++) {
            res[i][j] = count++;
        };
        for(; j > startY;j--) {
            res[i][j] = count++;
        };
        for(; i > startX; i--) {
            res[i][j] = count++;
        };

        startX++;
        startY++;
        offset++;
    };

    if(n % 2 === 1) {
        const mid = Math.floor(n / 2);
        res[mid][mid] = count;
    };

    return res;
 };