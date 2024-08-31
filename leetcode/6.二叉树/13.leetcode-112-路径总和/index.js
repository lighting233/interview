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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    if (root === null) return false;
    //直接传入targetSum做减法
    const traversal = (root, count) => {
        if (root.left === null && root.right === null && count === 0) return true;
        if (root.left === null && root.right === null && count !== 0) return false;
        if (root.left) {
            //todo 减掉的是左子树的值，不是再减根节点的值
            if (traversal(root.left, count - root.left.val)) return true;
        }
        if (root.right) {
            if (traversal(root.right, count - root.right.val)) return true;
        }
        //todo 没有符合的子节点返回 false
        return false;
    };
    //todo 初始的时候就要减掉根节点的值
    return traversal(root, targetSum - root.val);
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    if (root === null) return false;
    const dfs = (root, count) => {
        //todo 判断是否是叶子节点
        if (root.left === null && root.right === null) {
            return count === 0;
        };
        if(root.left && dfs(root.left, count - root.left.val)) return true;
        if(root.right && dfs(root.right, count - root.right.val)) return true;

        //todo
        return false;
    };

    return dfs(root, targetSum - root.val)
};