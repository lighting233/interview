//24-8-25 第一次学习
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    const res = [];
    if(root === null) return res;
    //todo stack
    // const queue = [root];
    const stack = [root];
    //todo cur
    let cur;
    while(stack.length) {
        //todo pop
        // const node = queue.shift();
        cur = stack.pop();
        res.push(cur.val);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
        
    }
    return res;
};

var postorderTraversal = function (root) {
    const res = [];
    if(root === null) return res;
    const stack = [];
    let cur = root;

    while(stack.length || cur) {
        if(cur !== null) {
            stack.push(cur)
            cur = cur.left;
        }else {
            const node = stack.pop();
            res.push(node.val);
            cur = node.right;
        }
    }
    return res;
};

var inorderTraversal = function (root) {
    const res = [];
    if(root === null) return res;
    //todo stack
    // const queue = [root];
    const stack = [root];
    //todo cur
    let cur;
    while(stack.length) {
        //todo pop
        // const node = queue.shift();
        cur = stack.pop();
        res.push(cur.val);
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
        
        
    }
    return res.reverse();
};

/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {

};

var postorderTraversal = function (root) {

};

var inorderTraversal = function (root) {

};