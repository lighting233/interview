//24-9-17 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    const dummy = new ListNode(0,head);
    let p0 = dummy;
    let needMove = left - 1;
    while(needMove > 0) {
        p0 = p0.next;
        needMove--;
    };
    let prev = null, cur = p0.next;
    needMove = right - left + 1;
    while(needMove) {
        const temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
        needMove--
    };

    p0.next.next = cur;
    p0.next = prev;

    return dummy.next;
};
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    const dummy = new ListNode(0,head);
    let p0 = dummy;
    let step = left - 1;
    while(step) {
        p0 = p0.next;
        step--;
    };

    let prev = null, cur = p0.next;
    step = right - left + 1;

    while(step) {
        const temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
        step--;
    };
    p0.next.next = cur;
    p0.next = prev;

    return dummy.next;
};