//24-8-14 第一次学习

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
    //todo 在 JavaScript 中，字符串是不可变的
    //todo left++ < right--
    // function reverse(s, left, right) {
    //     while(left++ < right--) {
    //         [s[left],s[right]] = [s[right],s[left]];
    //     };
    //     return s;
    // }
    function reverse(arr, left, right) {
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    const arr = s.split('');
    for(let i = 0; i < arr.length; i+=2*k) {
        
        //todo
        if(i + k - 1 < arr.length) {
            reverse(arr,i, i + k - 1);
        }else {
            reverse(arr,i,arr.length - 1)
        }
    }

    return arr.join('');
};

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {

    function reverse(arr,left,right) {
        while(left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            //todo
            left++;
            right--;
        }
    };

    const arr = s.split('');

    for(let i = 0; i < arr.length; i += 2 * k) {
        
        if(i + k - 1 < arr.length) {
            reverse(arr, i, i + k - 1);
        }else {
            reverse(arr, i , arr.length - 1);
        }
    }

    return arr.join('')
};