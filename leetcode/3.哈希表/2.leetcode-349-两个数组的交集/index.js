//24-8-13 第一次学习

/**
 * set
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    //1.nums1转哈希表
    const setNums1 = new Set(nums1);
    //2.放到 res 里的要去重
    const res = new Set();
    //3.看 nums2 在 set 里出没出现过
    //todo 循环 比 迭代器快
    for(let i of nums2) {
        if(setNums1.has(i)) {
            res.add(i)
        }
    }
    
    return Array.from(res);
};


/**
 * set
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    const setNums1 = new Set(nums1);
    const set = new Set();

    for(let i = 0; i < nums2.length; i++) {
        if(setNums1.has(nums2[i])) {
            set.add(nums2[i])
        }
    };

    return [...set]
};

