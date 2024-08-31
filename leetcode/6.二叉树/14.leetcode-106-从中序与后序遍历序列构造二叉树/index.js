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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    if(postorder.length === 0) return null;

    const rootVal = postorder.pop();
    const root = new TreeNode(rootVal);
    const index = inorder.indexOf(rootVal);
    root.left = buildTree(inorder.slice(0,index),postorder.slice(0,index));
    root.right = buildTree(inorder.slice(index + 1),postorder.slice(index));

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
    if(preorder.length === 0) return null;

    const rootVal = preorder.shift();
    const index = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    root.left = buildTree(preorder.slice(0,index),inorder.slice(0,index));
    root.right = buildTree(preorder.slice(index),inorder.slice(index + 1));
    
    return root;
};