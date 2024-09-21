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
var rotateRight = function (head, k) {
    if (head === null || k === 0) return head;
    //统计长度
    let len = 1;
    //尾节点
    let cur = head;
    while (cur.next) {
        cur = cur.next;
        len++;
    };

    //计算偏移量
    let move = k % len;
    if (move === 0) return head;

    //找到新的尾节点
    let endPosition = len - move;
    let end = head;
    move = endPosition - 1;
    while (move) {
        end = end.next;
        move--;
    };

    let start = end.next;
    end.next = null;
    cur.next = head;

    return start;
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
var rotateRight = function (head, k) {
    if(head === null || head.next === null) return head;
    let len = 0; 
    let cur = head;
    while(cur) {
        cur = cur.next;
        len++;
    };

    if(k % len === 0) return head;
    k = k % len;

    let step = len - k - 1;
    cur = head;
    while(step) {
        cur = cur.next;
        step--;
    };

    const first = cur.next;
    const end = cur;
    while(k) {
        cur = cur.next;
        k--;
    };
    cur.next = head;
    end.next = null;
    return first;
};