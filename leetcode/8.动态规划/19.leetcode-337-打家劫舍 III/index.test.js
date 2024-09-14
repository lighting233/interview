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

    const posetorder = (root) => {
        if(root === null) return [0,0];
        const left = posetorder(root.left);
        const right = posetorder(root.right);

        return [root.val + left[1] + right[1], Math.max(left[0],left[1]) + Math.max(right[0],right[1])]
    };

    const [res1,res2] = posetorder(root);

    return Math.max(res1,res2);
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

};