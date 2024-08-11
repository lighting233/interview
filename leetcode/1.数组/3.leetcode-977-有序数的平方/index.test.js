 //24-8-11 第二次测试

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortedSquares = function(nums) {
    const len = nums.length;
    const res = Array(len).fill(0);
    let k = len - 1;
    //todo right = len - 1
    let left = 0, right = len - 1;
    while(left <= right) {
        const ll = nums[left] * nums[left];
        const rr = nums[right] * nums[right];

        if(ll > rr) {
            //todo res[k]
            res[k] = ll;
            left++;
        } else {
            res[k] = rr;
            right--;
        };
        k--;
    };
    return res;
 };