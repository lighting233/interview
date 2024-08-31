# 一、24年8月26日 第一次学习
[513-找树左下角的值](https://leetcode.cn/problems/find-bottom-left-tree-value/description/)

## 递归思路
- 前中后序遍历都可以，因为没有中节点的处理逻辑，第一个遍历的都是左节点
- 找深度最大的第一个叶子节点就是答案

