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
 * @return {boolean}
 */
var isValidBST = function (root) {
    let prev = null;
    const inorder = (root) => {
        if(root === null) return true;
        const left = inorder(root.left);
        if(prev !== null && prev.val >= root.val) {
            return false;
        };
        prev = root;
        const right = inorder(root.right);

        return right && left;
    };

    return inorder(root);
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
 * @return {boolean}
 */
var isValidBST = function (root) {
    let prev = null;
    const inorder = (root) => {
        if(root === null) return true;
        
        //todo undefined && undefined为 undefined
        //todo left为空直接返回 true 即可，叶子节点需要 left 为空为 true，right 为空为 true

        // let left;
        // if(root.left) {
        //     left = inorder(root.left);
        // };
        const left = inorder(root.left);
        if(prev !== null && prev.val >= root.val) return false;
        prev = root;
        const right = inorder(root.right);
        // let right;
        // if(root.right) {
        //     right = inorder(root.right);
        // };

        return left && right;
    };

    return inorder(root);
};