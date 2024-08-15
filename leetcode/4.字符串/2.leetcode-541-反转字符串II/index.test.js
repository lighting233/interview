//24-8-14 第二次测试


/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
    function reverse(arr,left,right) {
        while(left < right) {
            [arr[left],arr[right]] = [arr[right],arr[left]];
            left++;
            right--;
        }
    };
    const arr = s.split('');
    for(let i = 0; i < arr.length; i+= 2*k) {
        if(i + k - 1 < arr.length) {
            reverse(arr,i,i + k - 1);
        }else {
            reverse(arr,i, arr.length - 1)
        }
    }

    return arr.join('');
};
