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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    if(head === null || head.next === null) return head;
    const dummy = new ListNode(0,head);
    let prev = dummy, cur = head;

    //双指针,前一个指针用来探路,直到找到没有重复的节点时,prev节点才开始移动
    while(cur && cur.next) {
        if(cur.val === cur.next.val) {
            //1. cur退出循环时处于重复元素的最后一个
            while(cur.next && cur.val === cur.next.val) {
                cur = cur.next;
            };
            //2.cur已经重复了,所以要跳过
            prev.next = cur.next;
        } else {
            //3.移动prev指针,等待处理这个新元素指针的next该指向谁,如果元素不相同,保持原来的next逻辑
            prev = prev.next;
        };
        //3.cur移动到下一个元素,下一轮先判断这个元素重不重复
        cur = cur.next; 
    }

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
    if(head === null || head.next === null) return head;
    const dummy = new ListNode(0,head);
    let prev = dummy, cur = head;

    while(cur && cur.next) {
        if(cur.val === cur.next.val) {
            while(cur.next && cur.val === cur.next.val) {
                cur = cur.next;
            };
            prev.next = cur.next;
        }else {
            prev = cur;
        }
        cur = cur.next;
    };

    return dummy.next;
};