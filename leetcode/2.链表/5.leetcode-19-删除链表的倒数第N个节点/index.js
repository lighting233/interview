//24-8-12 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const dummy = new ListNode(0, head);

    let slow = fast = dummy;
    let step = n + 1;
    while (step--) {
        fast = fast.next;
    };

    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    };
    slow.next = slow.next.next;
    return dummy.next;
};



/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const dummy = new ListNode(0, head);
    let slow = dummy, fast = dummy;
    let step = n + 1;

    while (step--) {
        fast = fast.next;
    };

    while(fast !== null) {
        fast = fast.next;
        slow = slow.next;
    };

    slow.next = slow.next.next;

    return dummy.next;
};