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
var countNodes = function (root) {
    if(root === null) return 0;
    let left = root.left, right = root.right;
    let lnum = 0, rnum = 0;
    while(left) {
        left = left.left;
        lnum++;
    };
    while(right) {
        right = right.right;
        rnum++;
    };
    if(lnum === rnum) {
        return Math.pow(2, lnum + 1) - 1;
    };
    lnum = countNodes(root.left);
    rnum = countNodes(root.right);

    return 1 + lnum + rnum;
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
var countNodes = function (root) {

};