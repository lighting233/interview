//24-8-12 第二次测试

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 原链表操作
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    while(head !== null && head.val === val) {
        head = head.next;
    };
    if(head === null) return null;
    let cur = head;

    while(cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next;
        }
    };

    return head;
};

/**
 * 虚拟头节点
* @param {ListNode} head
* @param {number} val
* @return {ListNode}
*/
var removeElements = function (head, val) {
    const dummy = new ListNode(0,head);
    let cur = dummy;

    while(cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next;
        }
    };

    return dummy.next;
};

