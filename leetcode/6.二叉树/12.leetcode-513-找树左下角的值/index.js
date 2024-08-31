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
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    let maxDepth = -Infinity;
    let res;
    const dfs = (root, depth) => {
        if (root.left === null && root.right === null) {
            //找到第一个左子节点，就算他的父节点还有右子节点，也不会depth > maxDepth
            if (depth > maxDepth) {
                maxDepth = depth;
                res = root.val;
            };
            return;
        };
        root.left && dfs(root.left, depth + 1);
        root.right && dfs(root.right, depth + 1);
    };
    dfs(root, 1)
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
    let res;
    let maxDepth = 0;
    const dfs = (root, depth) => {
        if(root.left === null && root.right === null) {
            if(depth > maxDepth) {
                res = root.val;
                maxDepth = depth;
            };
            return;
        };
        //todo root.left &&
        //todo depth + 1
        root.left && dfs(root.left, depth + 1);
        root.right && dfs(root.right, depth + 1);
    };
    dfs(root, 1);
    return res;
};