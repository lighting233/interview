//24-9-22 第一次学习

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    //滑动窗口
    //使用一个 Set 来存储窗口内的字符，这样可以快速检查和删除字符。每次迭代时，都会计算当前窗口的长度，并更新最大长度 maxLen
    //窗口内出现重复元素,则删除窗口左边界,直到没有重复元素
    let maxLen = 0;
    const set = new Set();
    let left = 0;
    for(let right = 0; right < s.length; right++) {
        while(set.has(s[right])) {
            set.delete(s[left]);
            left++;
        };
        set.add(s[right]);
        maxLen = Math.max(maxLen, set.size);
    };

    return maxLen;
};
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const set = new Set();
    let maxLen = 1;
    let left = 0;
    for(let right = 0; right < s.length; right++) {
        while(set.has(s[right])) {
            set.delete(s[left]);
            left++;
        };
        //todo 先判断的s[right]重没重复,没有重复的元素才加入的,所以加入后才求新长度
        set.add(s[right]);
        //todo 
        maxLen = Math.max(maxLen,set.size)
        
    };

    return maxLen;
};