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
var findBottomLeftValue = function (root) {
    let res;
    let maxDepth = 0;

    const dfs = (root,curDepth) => {
        if(root.left === null && root.right === null && curDepth > maxDepth) {
            maxDepth = curDepth;
            res = root.val;
        };
        root.left && dfs(root.left,curDepth + 1);
        root.right && dfs(root.right,curDepth + 1);
    };
    dfs(root,1)
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
 * @return {number}
 */
var findBottomLeftValue = function (root) {

};