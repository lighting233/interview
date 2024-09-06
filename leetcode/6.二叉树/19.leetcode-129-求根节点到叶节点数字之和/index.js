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
var sumNumbers = function (root) {
    let res = 0;

    const traversal = (root, curVal) => {
        if(root.left === null && root.right === null) {
            res+=Number(curVal);
            return;
        };
        root.left && traversal(root.left, curVal + root.left.val);
        root.right && traversal(root.right, curVal + root.right.val);
    };

    traversal(root, root.val + '');

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
var sumNumbers = function (root) {
    let res = 0;

    const dfs = (root,path) => {
        if(root.left === null && root.right === null) {
            res+= Number(path);
            return;
        };
        root.left && dfs(root.left, path+root.left.val);
        root.right && dfs(root.right, path+root.right.val);
    };
    dfs(root,'' + root.val);
    return res;
};