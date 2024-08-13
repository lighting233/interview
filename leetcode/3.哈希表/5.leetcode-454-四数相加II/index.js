//24-8-13 第一次学习

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
    let res = 0;
    const map = new Map();

    for(let i = 0; i < nums1.length;i++) {
        for(let j = 0; j < nums2.length; j++) {
            const sum = nums1[i] + nums2[j];
            map.set(sum, (map.get(sum) || 0) + 1);
        };
    };

    for(let i = 0; i < nums3.length;i++) {
        for(let j = 0; j < nums4.length; j++) {
            const target = 0 - (nums3[i] + nums4[j]);
            if(map.get(target)) {
                res+=map.get(target);
            }
        };
    };

    return res;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
    const map = new Map();
    let res = 0;
    for(let i = 0; i < nums1.length;i++) {
        for(let j = 0; j < nums2.length; j++) {
            const key = nums1[i] + nums2[j];
            map.set(key, (map.get(key) || 0) + 1);
        };
    };

    for(let i = 0; i < nums3.length;i++) {
        for(let j = 0; j < nums4.length; j++) {
            const target = 0 - (nums3[i] + nums4[j]);
            if(map.get(target)) {
                res+=map.get(target);
            }
        };
    };

    return res;
};