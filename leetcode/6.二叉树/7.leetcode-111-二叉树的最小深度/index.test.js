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
 * @return {number}
 */
 var minDepth = function(root) {
    if(root === null) return 0;

    if(root.left === null && root.right !== null) return 1 + minDepth(root.right);
    if(root.left !== null && root.right === null) return 1 + minDepth(root.left);

    return 1 + Math.min(minDepth(root.left),minDepth(root.right));
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
 * @return {number}
 */
 var minDepth = function(root) {
    const getHeight = (root) => {
        if(root === null) return 0;
        const leftHeight = getHeight(root.left);
        const rightHeight = getHeight(root.right);
        if(leftHeight === 0 && rightHeight !== 0) return 1 + rightHeight;
        if(rightHeight === 0 && leftHeight !== 0) return 1 + leftHeight;

        return 1 + Math.min(leftHeight, rightHeight);
    };
    return getHeight(root);
 };