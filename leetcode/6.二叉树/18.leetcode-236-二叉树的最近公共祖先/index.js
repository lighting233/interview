//24-8-31 第一次学习
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    const traversal = (root,p,q) => {
        if(root === null) return null;
        if(root === p || root === q) return root;

        const left = traversal(root.left,p,q);
        const right = traversal(root.right,p,q);
        if(left && right) return root;
        if(left === null && right) return right;
        if(left && right === null) return left;
        if(left === null && right === null) return null;

    };

    return traversal(root,p,q);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {

};