//24-9-19 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    //我们可以创建一个新的链表来保存结果，并使用一个指针来追踪链表的末端。最后，我们将未处理完的链表连接到新的链表末尾
    const dummy = new ListNode(0);
    let cur = dummy;

    while(list1 !== null && list2 !== null) {
        if(list1.val > list2.val) {
            cur.next = list2;
            list2 = list2.next;
        }else {
            cur.next = list1;
            list1 = list1.next;
        };
        cur = cur.next;
    };

    if(list1 !== null) {
        cur.next = list1;
    };

    if(list2 !== null) {
        cur.next = list2;
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {

};