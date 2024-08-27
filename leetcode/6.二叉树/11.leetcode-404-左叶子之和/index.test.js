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
var sumOfLeftLeaves = function (root) {
    if(root === null) return 0;
    if(root.left === null && root.right === null) return 0;
    let leftNum;
    if(root.left && root.left.left === null && root.left.right === null){
        leftNum = root.left.val;
    }else {
        leftNum = sumOfLeftLeaves(root.left);
    }
    const rightNum = sumOfLeftLeaves(root.right);

    return leftNum + rightNum;
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
var sumOfLeftLeaves = function (root) {

};