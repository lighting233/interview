/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
    const dp = Array(n+1).fill(1);
    //todo
    // let res = 1;

    for(let i = 2; i <=n; i++) {
        for(let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], dp[i - j]*j, j*(i-j))
        };
        //todo
        // res = Math.max(res, dp[i])
    }
    
    //todo
    // return res;
    return dp[n]
};

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {

};