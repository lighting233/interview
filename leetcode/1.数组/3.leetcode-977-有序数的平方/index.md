# 一、24年8月10日 第一次学习
## [lteetcode-977 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/description/)

### 1.如何想到双指针解法？

- 都平方后，一定是两边最大，向中间减小，两端使用指针，能获得一个由大到小排列的数组
- 更新新数组时，我们把下标由大到小更新，就得到一个由小到大排序的数组
