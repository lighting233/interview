/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let res = 0;

    function centerMove(s,left, right) {
        while(left >= 0 && right < s.length && s[left] === s[right]) {
            res++;
            left--;
            right++;
        }
    };

    for(let i = 0; i < s.length; i++) {
        centerMove(s,i,i);
        centerMove(s,i,i+1);
    };

    return res;
};

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let res = 0;
    const len = s.length;
    const dp = Array(len).fill(false).map(() => Array(len).fill(false));

    for(let i = len - 1; i >=0; i--) {
        for(let j = i; j < len; j++) {
            if(s[i] === s[j]) {
                if(j - i <= 1) {
                    dp[i][j] = true;
                }else if(dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                }
        
                if(dp[i][j]) res++;
            }
        }
    }

    return res;
};