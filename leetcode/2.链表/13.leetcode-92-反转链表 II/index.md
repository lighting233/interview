# 一、24年9月17日 第一次学习
## [lteetcode-92-反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/description/)

[反转链表系列](https://www.bilibili.com/video/BV1sd4y1x7KN/?spm_id_from=333.788&vd_source=78435c3cefd4783245d9d16d09d19859)

1. 反转后的链表最后一个节点是 prev
2. 我们设置这段区间的前一个节点为 p0，则 p0.next 应该指向 cur
3. p0 指向 prev
4. 考虑特殊情况，当 left 为头节点开始时，我们是没有 p0 的，所以需要哨兵节点



