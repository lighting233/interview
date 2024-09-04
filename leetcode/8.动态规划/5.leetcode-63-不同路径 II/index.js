//24-9-4 第一次学习

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    const [m,n] = [obstacleGrid.length, obstacleGrid[0].length];
    const dp = Array(m).fill(0).map(() => Array(n).fill(0));

    //for(let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    for(let i = 0; i < m; i++) {
        if(obstacleGrid[i][0]) {
            break;
        };
        dp[i][0] = 1;
    };
    for(let j = 0; j < n; j++) {
        if(obstacleGrid[0][j]) {
            break;
        };
        dp[0][j] = 1;
    };

    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            if(!obstacleGrid[i][j]) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    };

    return dp[m - 1][n - 1];
};

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {

};