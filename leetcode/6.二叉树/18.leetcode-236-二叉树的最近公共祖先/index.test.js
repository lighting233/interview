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
    if(root === null) return null;
    //todo root就是结果直接返回
    if(root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left,p,q);
    const right = lowestCommonAncestor(root.right,p,q);
    if(left && !right) return left;
    if(right && !left) return right;
    if(right && left) return root;

    return null;
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