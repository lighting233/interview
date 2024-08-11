# 一、24年8月11日 第一次学习
## [lteetcode-203 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/description/)

### 1.在原链表上操作

- 对于中间节点的删除则`head.next = head.next.next`
- 对于头节点的删除则`head = head.next`

### 2.如果想统一删除方式，则使用虚拟头节点
   
### 3.如果想使用节点上的值。需要先判空


