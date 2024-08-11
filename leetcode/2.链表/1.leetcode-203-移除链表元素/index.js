//24-8-11 第一次学习

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
 var removeElements = function(head, val) {
    //1.使用 while 一直删除头节点
    //判断是否为空，因为要操作节点的属性
    //todo 判断存在
    // while(!head && head.val === val) {
    while(head !== null && head.val === val) {
        head = head.next;
    };

    //2.使用 cur 指针遍历后续节点，因为头节点不能动，要返回，所以需要一个其他指针，删除节点需要用到这个节点的前一个；
    let cur = head;
    //3.也要先判断cur.next是否为空，因为要判断它的 val
    //todo 判断存在
    // while(!cur && !cur.next) {
    while(cur !== null && cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next;
        }
    }

    //return head不是 cur，cur 是移动的指针
    return head;
 };

 /**
  * 虚拟头节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
  var removeElements = function(head, val) {
    const dummy = new ListNode(0,head);
    //1.cur = dummy因为删除的是中间元素，也正是因为这样统一删除中间元素，才使用的虚拟头节点
    let cur = dummy;
    //2.!==null 因为要操作他们的属性
    while(cur !== null && cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next;
        }
    };
    return dummy.next;
  };

//24-8-10 第一次测试

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
 var removeElements = function(head, val) {
    while(head !== null && head.val === val) {
        head = head.next;
    };

    let cur = head;

    //todo cur可能等于 null
    if(cur === null) return null;

    
    while(cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next
        }
    }

    return head;
 };

 /**
  * 虚拟头节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
  var removeElements = function(head, val) {
    const dummy = new ListNode(0,head);
    let cur = dummy;

    while(cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next;
        }
    }

    return dummy.next;
  };