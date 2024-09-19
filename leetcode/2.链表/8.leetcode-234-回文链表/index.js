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
 * @return {boolean}
 */
var isPalindrome = function (head) {
   //链表为偶数时，快指针走到倒数第二个，为奇数时，走到最后一个，两种情况慢指针都处于中间位置。
   let fast = slow = head;
   //todo 为了保证偶数时，slow 停在第二个二上，需要while (fast && fast.next)
   // while(fast.next && fast.next.next) {
   while (fast && fast.next) {
       fast = fast.next.next;
       slow = slow.next;
   };

   let prev = null, cur = slow;
   while (cur) {
       const temp = cur.next;
       cur.next = prev;
       prev = cur;
       cur = temp;
   };

   let left = head;
   let right = prev;
   //left 的 next 还是会指向中间节点的下一个，所以要遍历右边的节点
   while (right) {
       if (left.val !== right.val) return false;
       left = left.next;
       right = right.next;
   }

   return true
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
 * @return {boolean}
 */
var isPalindrome = function (head) {

};