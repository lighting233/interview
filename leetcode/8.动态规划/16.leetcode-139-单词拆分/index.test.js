/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;

    for(let j = 0; j <= s.length; j++) {
        for(let word of wordDict) {
            if(j >= word.length && dp[j - word.length] === true && word === s.slice(j - word.length, j)) {
                dp[j] = true;
            }
        }
    };

    return dp[s.length];
};
/**
* @param {string} s
* @param {string[]} wordDict
* @return {boolean}
*/
var wordBreak = function (s, wordDict) {

};

