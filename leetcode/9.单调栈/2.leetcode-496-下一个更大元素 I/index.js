//24-9-16 第一次学习

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const res = Array(nums1.length).fill(-1);
    const map = new Map();
    for(let i = 0; i < nums1.length; i++) {
        map.set(nums1[i],i);
    };

    const stack = [];
    for(let i = 0; i < nums2.length; i++) {
        while(stack.length && nums2[stack.at(-1)] < nums2[i]) {
            const idx = stack.pop();
            const nums1idx = map.get(nums2[idx]);
            res[nums1idx] = nums2[i];
        };
        if(map.has(nums2[i])) {
            stack.push(i);
        };
    };

    return res;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const res = Array(nums1.length).fill(-1);
    const map = new Map();
    for(let i = 0; i < nums1.length; i++) {
        map.set(nums1[i], i);
    };

    const stack = [];
    for(let i = 0; i < nums2.length; i++) {
        while(stack.length && stack.at(-1) < nums2[i]) {
            const val = stack.pop();
            const idx = map.get(val);
            res[idx] = nums2[i];
        };

        if(map.has(nums2[i])) {
            stack.push(nums2[i]);
        }
    };
    return res;
};