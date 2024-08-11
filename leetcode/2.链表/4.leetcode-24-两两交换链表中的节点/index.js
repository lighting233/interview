//24-8-11 第一次学习

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

    //1.链表节点数量为偶数时，cur.next = null就可以结束了,为奇数时，cur.next.next = null就可以结束了，本身最后一个节点就不需要操作
    while(cur.next !== null && cur.next.next !== null) {
        //2.dummy -> 2
        //还需要先记录节点1，不然找不到了
        //节点 3 也要先保存一下，不然 2-> 1，3 也找不到了
        const temp = cur.next;//保存的节点 1
        const temp1 = cur.next.next.next;//保存的节点 3

        //3. dummy -> 2
        cur.next = cur.next.next;
        //4. 2->1
        cur.next.next = temp;
        //5. 1 -> 3
        temp.next = temp1;

        //6.直接移到 3 之前的节点
        cur = cur.next.next;
    }

    return dummy.head;
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