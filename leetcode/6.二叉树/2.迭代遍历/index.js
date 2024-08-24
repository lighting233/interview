//24-8-24 第一次学习
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
    //根节点先入栈，然后右节点入栈，再左，因为出栈就是要处理我们的元素，栈先进后出
    const res = []
    if(root === null) return res;
    const stack = [root];
    let cur;
    while(stack.length) {
        cur = stack.pop();
        res.push(cur.val);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    };
    return res;
};

var postorderTraversal = function (root) {
    //前序和后续能直接操作是因为他们的便利顺序和节点处理顺序相同，但中序遍历不行
    //中序遍历先遍历根节点，但第一个要处理的节点是左子树的叶子节点，访问和处理的顺序不一致
    const res = [];
    if(root === null) return res;
    //栈记录遍历顺序
    const stack = [];
    //指针记录处理的元素
    let cur = root;
    //因为是左中右的顺序，遍历还是要从根节点开始向左，当根节点出栈，栈为空时，指针指向根节点，还要接续处理右边节点
    while(stack.length || cur) {
        if(cur) {
            // cur 存在则指针进行遍历
            stack.push(cur);
            cur = cur.left;
        }else {
            //cur 不存在时，说明遍历到了叶子节点，那当前节点为中，也是要处理的节点
            cur = stack.pop();
            res.push(cur.val);
            cur = cur.right;
        }
    }
    return res;
};

var inorderTraversal = function (root) {
    //前序是中左右，把左右换顺序就是中右左，把中右左整体翻转，就是左右中后序遍历
    const res = [];
    if(root === null) return res;
    const stack = [root];
    let cur;
    while(stack.length) {
        cur = stack.pop();
        res.push(cur.val);
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    };
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