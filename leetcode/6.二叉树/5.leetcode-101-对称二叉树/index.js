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
 * @return {boolean}
 */
var isSymmetric = function (root) {
    //函数的作用是比较两个节点是否相同，并不是比较一个节点的左右节点是否相同
    const compare = (left, right) => {
        if (left === null && right === null) {
            return true;
        } else if (left === null || right === null) {
            return false;
        } else if (left.val !== right.val) {
            return false;
        };
        const outsideIsTrue = compare(left.left, right.right);
        const insideIsTrue = compare(left.right, right.left);
        return outsideIsTrue && insideIsTrue;
    };

    return compare(root.left, root.right)
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
 * @return {boolean}
 */
var isSymmetric = function (root) {

};