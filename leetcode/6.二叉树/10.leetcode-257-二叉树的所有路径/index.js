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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    const res = [];

    const traversal = (root, curPath) => {
        //左右子树都为空的时候收集结果
        if (root.left === null && root.right === null) {
            curPath += root.val
            res.push(curPath);
            return;
        };
        curPath += root.val + '->';
        //隐藏了回溯
        root.left && traversal(root.left, curPath);
        root.right && traversal(root.right, curPath);
    };

    traversal(root, '');

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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    const res = [];
    const tarversal = (root, curPath) => {
        if(root.left === null && root.right === null) {
            curPath += root.val;
            res.push(curPath);
            return;
        };
        curPath += root.val + '->';
        root.left && tarversal(root.left, curPath);
        root.right && tarversal(root.right,curPath);
    };
    tarversal(root,'');
    return res;
};