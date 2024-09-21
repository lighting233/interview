/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    const len = s.length;
    const isHuiWen = Array(len).fill(false).map(() => Array(len).fill(false));

    for(let i = len - 1; i >=0; i--) {
        for(let j = i; j < len; j++) {
            if(s[i] === s[j]) {
                if(j - i <= 1) {
                    isHuiWen[i][j] = true
                }else if(isHuiWen[i+1][j-1]){
                    isHuiWen[i][j] = true;
                }
            }
        }
    };

    const dp = Array(len).fill(Infinity);
    dp[0] = 0;
    for(let i = 1; i < len; i++) {
        if(isHuiWen[0][i]) {
            dp[i] = 0;
            //todo
            continue;
        }
        for(let j = 0; j < i; j++) {
            if(isHuiWen[j+1][i]) {
                //todo 求最小
                // dp[i] = dp[j] + 1;
                dp[i] = Math.min(dp[i],dp[j] + 1)
            }
        }
    }

    return dp[len - 1];
};

/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {

};
