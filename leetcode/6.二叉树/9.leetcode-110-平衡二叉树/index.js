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
var isBalanced = function (root) {
    const getHeight = (root) => {
        //确定返回值，不符合平衡二叉树向上返回-1，符合返回高度，后序遍历
        if(root === null) return 0;
        //单层逻辑
        const leftHeight = getHeight(root.left);
        if(leftHeight === -1) return -1;
        const rightHeight = getHeight(root.right);
        if(rightHeight === -1) return -1;

        if(Math.abs(rightHeight - leftHeight) > 1) {
            return -1;
        }else {
            //当前节点的高度
            return 1 + Math.max(leftHeight,rightHeight);
        }
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

    const getHeight = (root) => {
        if(root === null) return 0;
        let leftHeight = getHeight(root.left);
        //todo 已经收集到不符合了，直接返回去
        if(leftHeight === -1) return -1;
        let rightHeight = getHeight(root.right);
        if(rightHeight === -1) return -1;
        if(Math.abs(rightHeight - leftHeight) > 1) return -1;

        return 1 + Math.max(leftHeight,rightHeight);
    };

    return getHeight(root) === -1 ? false : true;
};