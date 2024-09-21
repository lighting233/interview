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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    const dummy = new ListNode(0,head);
    let n = 0;
    let cur = head;
    while(cur) {
        cur = cur.next;
        n++;
    };

    let p0 = dummy;
    let group = Math.floor(n / k);

    while(group) {
        let prev = null;
        let cur = p0.next;
        let move = k;

        while(move) {
            const temp = cur.next;
            cur.next = prev;
            prev = cur;
            cur = temp;
            move--;
        };
        const temp = p0.next;
        p0.next.next = cur;
        p0.next = prev;
        p0 = temp;

        group--;
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
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    //todo 从0开始计数
    let len = 0;
    let cur = head;
    while(cur !== null) {
        cur = cur.next;
        len++;
    };

    let group = Math.floor(len / k);
    const dummy = new ListNode(0, head);
    let p0 = dummy;

    while(group) {
        let step = k;
        let prev = null, cur = p0.next;

        while(step) {
            const temp = cur.next;
            cur.next = prev;
            prev = cur;
            cur = temp;
            step--;
        }
        const temp = p0.next;
        p0.next.next = cur;
        p0.next = prev;
        p0 = temp;
        group--;
    }

    return dummy.next;
};