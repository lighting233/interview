//24-8-11 第一次学习

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 双指针
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
    let cur = head;
    let prev = null;

    //1.while判断cur不为空，因为最后一步操作，cur 移动完，就移动到 null 上了
    while(cur !== null) {
        //2.需要一个临时指针，在 cur 转向前，存好 cur 的下一个节点。
        const temp = cur.next;
        cur.next = prev;
        //3.先移动 prev，后移动 cur，不然 prev 找不到 cur 了
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
  var reverseList = function(head) {
    
    //1.需要一个reverse函数反转 cur 和 prev
    function reverse(cur,prev) {
        //2.终止条件还是 cur === null，返回 prev
        if(cur === null) return prev;
        //3. 反转 cur
        const temp = cur.next;
        cur.next = prev;
        //4. 双指针同时移动一位，进行下一次反转
        return reverse(temp,cur);
    }

    //直接 return prev
    //参数还是 head 和 null
    return reverse(head,null);
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
 var reverseList = function(head) {
    let cur = head, prev = null;

    while(cur !== null) {
        const temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
    };

    return prev;
 };

  /**
  * 递归的写法
 * @param {ListNode} head
 * @return {ListNode}
 */
   var reverseList = function(head) {
    
    function reverse(cur,prev) {
        if(cur === null) return prev;

        const temp = cur.next;
        cur.next = prev;

        return reverse(temp, cur);
    }

    return reverse(head,null);
    
 };