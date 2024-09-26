/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const set = new Set();
    //todo 
    let maxLen = 0;
    let left = 0;
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        // if(set.has(char)) {
        //     while(s[left] !== char) {
        //         set.delete(s[left]);
        //         left++;
        //     }
        // }
        while (set.has(char)) {
            set.delete(s[left]);
            left++;
        };
        set.add(char);
        maxLen = Math.max(set.size,maxLen);
    };

    return maxLen;
};
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {

};