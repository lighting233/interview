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
    let deepth = -Infinity;
    const dfs = (root,count) => {
        if(root === null) {
            deepth = Math.max(deepth,count);
            return;
        };
        count++;
        dfs(root.left,count);
        dfs(root.right,count);
    };

    dfs(root,0)

    return deepth;
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