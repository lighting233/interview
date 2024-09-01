# 一、24年8月31日 第一次学习
[236-二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/?envType=study-plan-v2&envId=top-interview-150)

- 后序遍历，回溯的过程中把公共根节点向上返回
- 左节点返回的不为空，右节点返回的不为空，那现在的节点就是公共节点
- 如果 p 是 q 的祖先节点，则遍历到 p 的时候直接向上返回了，不用向下遍历 q 这个子节点了