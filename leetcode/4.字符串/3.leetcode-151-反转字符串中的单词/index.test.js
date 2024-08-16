//24-8-14 第二次测试


/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const arr = [...s];

    function removeExtraSpaces(arr) {
        let slow = fast = 0;
        while(fast < arr.length) {
            if(arr[fast] === ' ' && (fast === 0 || arr[fast - 1] === ' ')) {
                fast++;
            }else {
                arr[slow] = arr[fast];
                slow++;
                fast++;
            }
        };

        arr.length = arr[slow - 1] === ' ' ? slow - 1 : slow;
    }

    removeExtraSpaces(arr);

    function reverseWords(arr,left, right) {
        while(left < right) {
            [arr[left],arr[right]] = [arr[right],arr[left]];
            left++;
            right--;
        }
    }

    reverseWords(arr,0, arr.length - 1);

    let everyStart = 0;
    for(let end = 0; end <= arr.length; end++) {
        if(arr[end] === ' ' || end === arr.length) {
            reverseWords(arr, everyStart, end - 1);
            everyStart = end + 1;
        }
    };

    return arr.join('');
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const res = [];
    let end = 0;
    while(end < s.length) {
        while(s[end] === ' ') end++;
        let wordStart = end;
        if(wordStart < s.length) {
            //todo 不加判断end < s.length，在s 末尾如果没有空格，则会一直循环下去
            // while(s[end] !== ' ') end++;
            while(end < s.length && s[end] !== ' ') end++;
            res.unshift(s.slice(wordStart,end))
        }
    }
    return res.join(' ');
};

