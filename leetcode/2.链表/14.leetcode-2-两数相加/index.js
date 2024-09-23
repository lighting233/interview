//24-9-22 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const dummy = new ListNode(0);
    let carry = 0;
    let cur = dummy;

    while (l1 || l2) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        const total = carry + val1 + val2;
        carry = Math.floor(total / 10);
        const val = total % 10;
        const list = new ListNode(val);
        cur.next = list;
        cur = cur.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    };

    //最后是否进位
    if (carry) {
        cur.next = new ListNode(carry)
    };

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let carry = 0;
    let dummy = new ListNode(0);
    let cur = dummy;

    while(l1 || l2) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        const total = val1 + val2 + carry;
        carry = Math.floor(total / 10);
        const val = total % 10;
        cur.next = new ListNode(val);
        cur = cur.next;

        //todo
        if(l1) {
            l1 = l1.next;
        };
        if(l2) {
            l2 = l2.next;
        }
    };

    if(carry) {
        cur.next = new ListNode(carry);
    };

    return dummy.next;

};