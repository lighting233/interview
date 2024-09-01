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
var kthSmallest = function (root, k) {
    let res;
    const inorder = (root) => {
        if(root !== null) {
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
var kthSmallest = function (root, k) {
    const stack = [];
    let cur = root;

    while(stack.length || cur) {
        if(cur) {
            //todo cur
            stack.push(cur);
            cur = cur.left;
        }else {
            //cur
            cur = stack.pop();
            k--;
            if(k === 0) {
                return cur.val;
            };
            cur = cur.right;
        }
    }
};