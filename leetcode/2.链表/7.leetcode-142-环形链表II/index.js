//24-8-12 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
    //todo 不需要 dummy，因为不需要操作当前节点的前一个节点
    // const dummy = head;
    // let slow = fast = dummy;

    let slow = head, fast = head;
    //  todo 不能在判断里fast !== slow，因为初始的时候他们都为 head
    // while(fast !== null && fast.next !== null && fast !== slow) {
    while(fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow) {
            break;
        }
    };
    //todo 假如一个只有一个节点的非环链表，就要判断fast.next
    // if(fast === null) return null;
    if(fast === null || fast.next === null) return null;
    fast = head;
    while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    };

    return fast;
 };

 /**
 * @param {ListNode} head
 * @return {ListNode}
 */
  var detectCycle = function(head) {
    let fast = head, slow = head;

    while(fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;

        if(fast === slow) {
            break;
        }
    };

    if(fast === null || fast.next === null) return null;

    fast = head;

    while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    };

    return fast;
 };