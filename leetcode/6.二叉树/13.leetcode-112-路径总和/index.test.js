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
    if(root === null) return false;

    const traversal = (root, count) => {
        if(root.left === null && root.right === null) {
            return count === 0;
        };
        let left;
        if(root.left) {
            left =  traversal(root.left, count - root.left.val);
            if(left) return true;
        };
        let right;
        if(root.right) {
            right =  traversal(root.right, count - root.right.val);
            if(right) return true;
        };

        return false;
    }
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
    if(root === null) return false;

    const dfs = (root,count) => {
        if(root.left === null && root.right === null) {
            return count === 0;
        };

        if(root.left && dfs(root.left,count - root.left.val)) return true;
        if(root.right && dfs(root.right,count - root.right.val)) return true;

        return false;
    }
    
    return dfs(root,targetSum - root.val)
};