//24-9-25 第一次学习

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let minLen = Infinity;
    //因为结果返回的是字符串,所以需要记录窗口满足条件时的左下标,因为后续还要缩小左边界,可能会失败
    let start = s.length;
    //记录t每个字符出现的次数(s的窗口中各个值还需要的次数)
    const map = {};
    for (let char of t) {
        map[char] = (map[char] || 0) + 1;
    };
    let typeNum = Object.keys(map).length;

    let left = right = 0;

    while (right < s.length) {
        const char = s[right];
        if (map[char] !== undefined) map[char]--;
        if (map[char] === 0) typeNum--;

        while (typeNum === 0) {
            //如果是最小的长度记录结果
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            };

            const char = s[left];
            if (map[char] !== undefined) map[char]++;
            if (map[char] > 0) typeNum++;
            left++;
        };
        right++;
    };
    if (start === s.length) return '';
    return s.slice(start, start + minLen)
};

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let maxLen = Infinity;
    let start = s.length;
    const map = {};
    for (let char of t) {
        map[char] = (map[char] || 0) + 1;
    };
    let needType = Object.keys(map).length;

    let left = 0;
    for (let right = 0; right < s.length; right++) {
        let char = s[right];

        //todo
        // if (map[char]) map[char]--;
        if (map[char] !== undefined) map[char]--;
        if(map[char] === 0) needType--;

        while(needType === 0) {
            if(right - left + 1 < maxLen) {
                maxLen = right - left + 1;
                start = left;
            };

            const char = s[left];
            //todo 
            // if(map[char]) map[char]++;
            if(map[char] !== undefined) map[char]++;
            if(map[char] > 0) needType++;
            left++;
        }
    }

    if(start === s.length) return '';
    return s.slice(start, start + maxLen);
};