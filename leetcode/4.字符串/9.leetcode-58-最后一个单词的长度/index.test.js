/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let count = 0;
    const len = s.length;

    for(let i = len - 1; i >=0; i--) {
        if(s[i] !== ' ') {
            count++;
        }else {
            if(count > 0) break;
        }
    };

    return count;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {

};