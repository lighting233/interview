//24-8-12 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    let p = headA,q = headB

    //todo 节点相等，而不是值相等，有可能每个节点的值都相等
    // while(p.val !== q.val) {
    while(p !== q){
        //todo 如果没有交点的话，这样无法退出循环，因为 p 不会等于 null
        // p = p.next === null ? headB : p.next;
        // q = q.next === null ? headA : q.next;
        p = p === null ? headB : p.next;
        q = q === null ? headA : q.next;
    };

    return p;
 };

 /**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
  var getIntersectionNode = function(headA, headB) {
    let p = headA, q = headB;

    while(p !== q) {
        p = p === null ? headB : p.next;
        q = q === null ? headA : q.next;
    };

    return p;
 };

 