//24-9-5 第一次学习

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
var rob = function (root) {
    //定义一个一维 dp 数组,dp[0]不偷最大的金币数量，dp[1]偷
    const postorder = ( root ) => {
        if(root === null) return [0,0];
        const left = postorder(root.left);
        const right = postorder(root.right);
        //后序遍历，当前节点的值，需要他的左右子节点的值来确定
        //偷当前节点
        const val1 = root.val + left[0] + right[0];
        //不偷
        const val2 = Math.max(left[0],left[1]) + Math.max(right[0],right[1]);

        return [val2,val1]
    };
    const res = postorder(root);

    return Math.max(res[0],res[1])
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
var rob = function (root) {

    const postorder = (root) => {
        if(root === null) return [0,0];
        const left = postorder(root.left);
        const right = postorder(root.right);
        return [left[1] + right[1] + root.val, Math.max(left[1],left[0]) + Math.max(right[0], right[1])]
    };

    const [res1, res2] = postorder(root);

    return Math.max(res1,res2);
};