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
var reverseList = function (head) {

  let cur = head, prev = null;

  while (cur !== null) {
    const temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  return prev;
};

/**
* 递归的写法
* @param {ListNode} head
* @return {ListNode}
*/
var reverseList = function (head) {

  function reverse(cur,prev) {
    if(cur === null) return prev;

    const temp = cur.next;
    cur.next = prev;

    return reverse(temp, cur)
  }

    return reverse(head,null);
};
