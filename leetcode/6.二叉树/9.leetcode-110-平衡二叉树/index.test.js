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
var isBalanced = function (root) {
    const getHeight = (root) => {
        if(root === null) return 0;
        const leftHeight = getHeight(root.left);
        //todo return -1
        if(leftHeight === -1) return -1;
        const rightHeight = getHeight(root.right);
        //todo return -1
        if(rightHeight === -1) return -1;
        //todo 有一个子节点为 0 的话，不影响根节点的判断，另一个>1不是平衡，等于 1 平衡
        // if(leftHeight === 0 && rightHeight !== 0) return 1 + rightHeight;
        // if(leftHeight !== 0 && rightHeight === 0) return 1 + leftHeight;
        if(Math.abs(rightHeight - leftHeight) > 1) return -1;

        return 1 + Math.max(leftHeight,rightHeight);
    };

    return getHeight(root) === -1 ? false : true;
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
var isBalanced = function (root) {

};