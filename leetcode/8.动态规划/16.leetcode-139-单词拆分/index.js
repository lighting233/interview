//24-9-5 第一次学习

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const target = s.length;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;

    for (let j = 0; j <= target; j++) {
        for (let letter of wordDict) {
            //todo slice要有结尾
            if (letter.length <= target && dp[j - letter.length] === true && s.slice(j - letter.length, j) === letter) {
                dp[j] = true;
            }
        }
    }

    return dp[target]
};

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {

};