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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
    if(root === null || root.val === val) return root;

    if(root.val > val) {
        return searchBST(root.left,val);
    }else if(root.val < val) {
        return searchBST(root.right,val)
    }
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
    while(root !== null) {
        if(root.val > val) {
            root = root.left
        }else if(root.val < val) {
            root = root.right;
        }else {
            return root;
        }
    };

    return null;
};