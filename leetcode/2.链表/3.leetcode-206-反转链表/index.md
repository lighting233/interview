# 一、24年8月11日 第一次学习
## [lteetcode-206 反转链表](https://leetcode.cn/problems/reverse-linked-list/description/)

### 1.双指针解法

1. 定义指向头节点的 cur
2. cur反转后需要指向他的前一个节点，所以需要一个 prev，初始为 null，因为 head 直接指向前一位为空
3. 什么时候结束呢？cur 在最后一个节点时，再走一步，指向 null，prev 指向尾节点
4. 需要一个临时指针，在 cur 转向前，存好 cur 的下一个节点。
5. 先移动 prev，后移动 cur，不然 prev 找不到 cur 了

### 2.递归解法





