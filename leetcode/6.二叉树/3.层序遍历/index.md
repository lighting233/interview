# 一、24年8月25日 第一次学习
[102-层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/description/)
[相关题目](https://programmercarl.com/0102.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E5%B1%82%E5%BA%8F%E9%81%8D%E5%8E%86.html#%E7%AE%97%E6%B3%95%E5%85%AC%E5%BC%80%E8%AF%BE)

## 相当于图论中的广度优先搜索
- 依赖于队列
- 每层元素入队后记录元素数量，元素是不断变化的，记录了数量就知道队列要弹出多少个元素
