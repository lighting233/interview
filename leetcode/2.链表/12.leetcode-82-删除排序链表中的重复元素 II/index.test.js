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
var deleteDuplicates = function (head) {
    if(head === null || head.next === null) return head;
    const dummy = new ListNode(0,head);
    let prev = dummy, cur = head;

    while(cur !== null && cur.next !== null) {
        if(cur.val === cur.next.val) {
            while(cur.next && cur.val === cur.next.val) {
                cur = cur.next;
            }
            prev.next = cur.next;
        }else {
            prev = cur;
        };
        cur = cur.next;
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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {

};
