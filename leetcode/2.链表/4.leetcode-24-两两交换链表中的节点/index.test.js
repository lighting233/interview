 //24-8-12 第二次测试

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var swapPairs = function(head) {
    const dummy = new ListNode(0,head);
    let cur = dummy;

    while(cur.next !== null && cur.next.next !== null) {
        const first = cur.next;
        const second = first.next;
        const third = second.next;

        cur.next = second;
        second.next = first;
        first.next = third;

        cur = cur.next.next;
    };

    return dummy.next;
 };

