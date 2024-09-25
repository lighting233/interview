//24-9-25 第一次学习

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let p = m - 1, q = n - 1;
    let cur = m + n - 1;

    // todo 修正条件为 p 和 q 大于等于 0,对于初始n === 0的情况可以直接过滤掉
    //todo >= 0才能把自身的数据都处理完
    while(p >=0 && q >= 0) {
        if(nums1[p] > nums2[q]) {
            nums1[cur] = nums1[p];
            p--;
        }else {
            nums1[cur] = nums2[q];
            q--
        };
        cur--;
    };

    while(q >= 0) {
        nums1[cur] = nums2[q];
        q--;
        cur--;
    }
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    
};