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
var maxDepth = function (root) {
    let maxDeep = 0;
    const dfs = (root, cur) => {
        if(root === null) return 0;
        if(root.left === null && root.right === null) {
            return maxDeep = Math.max(maxDeep,cur + 1)
        }
        cur++;
        dfs(root.left,cur);
        dfs(root.right,cur)
    }
    dfs(root,0);
    return maxDeep
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
var maxDepth = function (root) {
    if(root === null) return 0;
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
};