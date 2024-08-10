//24-8-10 第一次学习

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    const len = nums.length;
    //todo 1.先建立 len 长度的数组。不是空数组
    const res = Array(len).fill(0);
    //2.新数组需要由小到大排列，两端先取最大的排到后边
    let k = len - 1;
    let left = 0, right = len - 1;
    //3.等于是因为如果小于的话，最后一次剩一个元素时不满足 left < right条件，直接退出循环，那么就落了一个元素
    while (left <= right) {
        const ll = nums[left] * nums[left];
        const rr = nums[right] * nums[right];
        if (ll < rr) {
            res[k] = rr;
            right--;
        } else {
            res[k] = ll;
            left++;
        }
        //4.存完后 k 也要向前移一位；
        k--;
    }

    return res;
};

//24-8-10 第一次测试

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    //1.创建len 长度的数组
    const len = nums.length;
    const res = Array(len).fill(0);
    //2.从最后一位填充，保证从小到大的顺序
    let k = len - 1;
    let left = 0, right = len - 1;

    //3.while循环应该<=,不然剩余一个元素时不满足判断条件，会退出循环，导致这个元素没有处理

    while(left <= right) {
        const ll = nums[left] * nums[left];
        const rr = nums[right] * nums[right];

        if(ll < rr) {
            res[k] = rr;
            right--;
        }else {
            res[k] = ll;
            left++;
        }

        //4.k 进一位
        k--;
    }

    return res;
};