//24-9-5 第一次学习

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
    //dp[i][j] 表示在 nums1 中以i - 1为结尾和在 nums2 中以 j - 1 为结尾时最长连续子数组的长度
    const [m, n] = [nums1.length, nums2.length];
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    let res = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            };
            res = Math.max(res, dp[i][j])
        }
    }
    return res;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {

};