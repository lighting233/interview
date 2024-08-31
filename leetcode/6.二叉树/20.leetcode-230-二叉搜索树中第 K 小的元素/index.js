//24-8-31 第一次学习
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
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k) {
    let res;
    const inorder = (root) => {
        if(root !== null && k > 0) {
            inorder(root.left);
            k--;
            if(k === 0) {
                res = root.val;
            };
            inorder(root.right);
        }
    };
    inorder(root);
    return res;
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
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k) {
//前序和后续能直接操作是因为他们的便利顺序和节点处理顺序相同，但中序遍历不行
    //中序遍历先遍历根节点，但第一个要处理的节点是左子树的叶子节点，访问和处理的顺序不一致
    let res;
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
            k--;
            if(k === 0) {
                res = cur.val;
                break;
            }
            cur = cur.right;
        }
    }
    return res;
 };