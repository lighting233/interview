//24-8-26 第一次学习
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
    //后序遍历，把左叶子节点和返回上去
    if(root === null) return 0;
    //不能仅判断是否是叶子节点，因为我们还判断他是不是左子节点,每个根节点收集的是他左子树的左叶子节点之和和右子树的左叶子节点之和，当遍历到叶子节点时，他的左子树，右子树都为空，所以收集的值为 0
    if(root.left === null && root.right === null) return 0;

    //左
    let leftVal;
    //用这个逻辑可以做层序
    if(root.left && root.left.left === null && root.left.right === null) {
        leftVal = root.left.val;
    }else {
        leftVal = sumOfLeftLeaves(root.left);
    };
    //右
    const rightVal = sumOfLeftLeaves(root.right);

    //中
    return leftVal + rightVal;
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
    if(root === null) return 0;
    if(root.left === null && root.right === null) return 0;

    let leftVal;
    if(root.left && root.left.left === null && root.left.right === null ) {
        leftVal = root.left.val;
    }else {
        leftVal = sumOfLeftLeaves(root.left);
    }

    const rightVal = sumOfLeftLeaves(root.right);

    return leftVal + rightVal;
};