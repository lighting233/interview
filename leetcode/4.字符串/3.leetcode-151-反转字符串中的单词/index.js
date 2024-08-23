//24-8-15 第一次学习

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const arr = [...s];

    //1. 删除多余空格
    removeExtraSpaces(arr);
    let a = 'abc  '
    //参考 27-移除元素
    function removeExtraSpaces(arr) {
        let fast = slow = 0;

        while (fast < arr.length) {
            if (arr[fast] === ' ' && (fast === 0 || arr[fast - 1] === ' ')) {
                fast++;
            } else {
                arr[slow] = arr[fast];
                slow++;
                fast++;
            };
        };
        //todo 不能用arr[slow]判断，会越界
        arr.length = arr[slow - 1] === ' ' ? slow - 1 : slow;
    }
    //2. 反转整个数组
    function reverse(arr, left, right) {
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    };

    reverse(arr, 0, arr.length - 1);

    //3. 遍历数组，反转每个单词

    let everyStart = 0;

    //todo <=是因为每次要停留在单词的下一位空格做处理
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] === ' ' || i === arr.length) {
            reverse(arr, everyStart, i - 1);
            everyStart = i + 1;
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

    let letterEnd = 0;

    while (letterEnd < s.length) {
        //1.越过起始空格,注意也是越过末尾空格，最后会越界付给letterStart
        while (s[letterEnd] === ' ') letterEnd++;
        //2.得到当前单词起始位置
        let letterStart = letterEnd;
        //todo 判断letterStart < s.length,因为 s 最后多个空格的话，判断letterStart = letterEnd = s.length
        //todo 'ab'.slice(2,2)为‘’，let a = ['','a','b'];a.join(' ')为' a b'
        if (letterStart < s.length) {
            while (letterEnd < s.length && s[letterEnd] !== ' ') letterEnd++;
            res.unshift(s.slice(letterStart, letterEnd))
        }
    };

    return res.join(' ')
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const arr = [...s];

    function removeExtraSpaces(arr) {
        let fast = slow = 0;

        while(fast < arr.length) {
            //todo
            // if(fast < arr.length && (fast === 0 || arr[fast - 1] === ' ')){
            if (arr[fast] === ' ' && (fast === 0 || arr[fast - 1] === ' ')) {
                fast++;
            }else {
                arr[slow] = arr[fast];
                slow++;
                fast++;
            };
        };
        //'abc ', 'abc  '
        return arr.length = arr[slow - 1] === ' ' ? slow - 1 : slow;
    }

    removeExtraSpaces(arr);

    function reverse(arr,left,right) {
        while(left < right) {
            [arr[left],arr[right]] = [arr[right],arr[left]];
            left++;
            right--;
        }
    }
    reverse(arr,0,s.length - 1);

    let newStart = 0;
    for(let i = 0; i <= s.length; i++) {
        if(arr[i] === ' ' || i === s.length) {
            reverse(arr,newStart,i - 1);
            newStart = i + 1;
        }
    };

    return arr.join('');
};

/**
* @param {string} s
* @return {string}
*/
var reverseWords = function (s) {

};