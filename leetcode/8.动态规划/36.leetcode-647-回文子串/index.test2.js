/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let res = 0;
    const len = s.length;
    const dp = Array(len).fill(false).map(() => Array(len).fill(false));

    for (let i = len - 1; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1) {
                    dp[i][j] = true;
                } else if (dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                }
                if (dp[i][j]) {
                    res++
                }
            }
        }
    };

    return res;
};

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let res = 0;

    function center(s, start, end) {
        while(start >=0 && end < s.length && s[start] === s[end]) {
            start--;
            end++;
            res++;
        }
    };

    for (let i = 0; i < s.length; i++) {
        center(s, i, i);
        center(s,i,i+1);
    }

    return res;
};
