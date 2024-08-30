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
    const compare = (left,right) => {
        if(left === null && right === null) {
            return true;
        }else if(left === null || right === null) {
            return false;
        }else if(left.val !== right.val) {
            return false;
        };

        const outer = compare(left.left,right.right);
        const inner = compare(left.right,right.left);
        return outer && inner;
    };

    return compare(root.left,root.right)
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