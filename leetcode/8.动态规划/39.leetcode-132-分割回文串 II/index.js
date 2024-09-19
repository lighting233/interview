//24-9-17 第一次学习

/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    //dp[i]：范围是[0, i]的回文子串，最少分割次数是dp[i]。
    //如果 j 在[0,i]之间作为切割点，那么区间[0,j]的最小切割次数是 dp[j]
    //区间[j+1,i]如果是回文的话，则dp[i] = dp[j] + 1
    //所以递推公式为dp[i] = Math.min(dp[i],dp[j] + 1)
    const len = s.length;
    const isHuiWen = Array(len).fill(false).map(() => Array(len).fill(false));

    for (let i = len - 1; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1 || isHuiWen[i + 1][j - 1]) {
                    isHuiWen[i][j] = true;
                }
            }
        }
    };

    const dp = Array(len).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i < len; i++) {
        if (isHuiWen[0][i]) {
            dp[i] = 0;
            continue;
        }
        for (let j = 0; j < i; j++) {
            if (isHuiWen[j + 1][i]) {
                dp[i] = Math.min(dp[i], dp[j] + 1)
            }
        }
    };
    return dp[len - 1];
};

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
                if((j - i <= 1) || isHuiWen[i+1][j-1]) {
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
            continue;
        }
        // for(let j = 0; j < i; j++) {
        //     if(isHuiWen[0][j]) {
        //         if(isHuiWen[j+1][i]) {
        //             dp[i] = dp[j] + 1
        //         }
        //     }
        // }
        //todo 不用看isHuiWen[0][j]是否是回文，因为dp[i]定义的是以 i 为结尾最小的切割次数，就算[0,j]区间不是回文，最多切割次数就是 j 次
        for(let j = 0; j < i; j++) {
            if(isHuiWen[j+1][i]) {
                dp[i] = Math.min(dp[i],dp[j] + 1);
            }
        }
    }

    return dp[len - 1];
};