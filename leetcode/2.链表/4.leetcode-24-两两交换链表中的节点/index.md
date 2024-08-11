# 一、24年8月11日 第一次学习
## [lteetcode-24 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)

### 1.还需要使用 dummy
因为操作这两个节点，还需要他们的前一个节点和这两个节点的后一个节点进行关联，所以 cur 也指向 dummy

### 2.什么时候终止
- 链表节点数量为偶数时，cur.next = null就可以结束了
- 为奇数时，cur.next.next = null就可以结束了，本身最后一个节点就不需要操作

### 3. dummy 指向 2,2 指向 1,1 指向 3，这一步怎么操作



