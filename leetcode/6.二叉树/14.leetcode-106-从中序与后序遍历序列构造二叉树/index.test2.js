/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    //todo 长度为零时返回空，完结叶子节点
    if(inorder.length === 0) return null;
    const rootVal = postorder.pop();
    const index = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    root.left = buildTree(inorder.slice(0,index),postorder.slice(0,index));
    root.right = buildTree(inorder.slice(index+1),postorder.slice(index));
    return root;
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {

};