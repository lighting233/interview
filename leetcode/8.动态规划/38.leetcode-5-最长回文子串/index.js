//24-9-17 第一次学习

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const dp = Array(s.length).fill(false).map(() => Array(s.length).fill(false));
    let maxLen = 1;
    let left = right = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i; j < s.length; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1) {
                    dp[i][j] = true;
                } else if (dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                }
            };
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                left = i;
                right = j;
            }
        }
    };

    return s.slice(left, right + 1);
};
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const len = s.length;
    const dp = Array(len).fill(false).map(() => Array(len).fill(false));

    let maxLen = 1, left = 0, right = 0;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            //todo ((j - i <= 1) || (dp[i + 1][j - 1] === true))
            // if(s[i] === s[j] && (j - i <= 1) || (dp[i + 1][j - 1] === true)) {
            if (s[i] === s[j] && ((j - i <= 1) || (dp[i + 1][j - 1] === true))) {
                dp[i][j] = true;
            }
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                left = i;
                right = j;
            };
        }

    };

    return s.slice(i, j + 1);
};