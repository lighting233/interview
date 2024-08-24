//24-8-24 第一次学习
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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    //1.确定递归的参数和返回值
    //2个参数，res 用闭包存储了
    const res = []
    const dfs = (root) => {
        //2.确定终止条件
        if(root === null) return;
        //3.确定单层递归的逻辑
        res.push(root.val);
        dfs(root.left);
        dfs(root.right)
    };
    dfs(root);
    return res;
};

var postorderTraversal = function (root) {
    const res = []
    const dfs = (root) => {
        //2.确定终止条件
        if(root === null) return;
        //3.确定单层递归的逻辑
        dfs(root.left);
        res.push(root.val);
        dfs(root.right)
    };
    dfs(root);
    return res;
};

var inorderTraversal = function (root) {
    const res = []
    const dfs = (root) => {
        //2.确定终止条件
        if(root === null) return;
        //3.确定单层递归的逻辑
        dfs(root.left);
        dfs(root.right);
        res.push(root.val);
    };
    dfs(root);
    return res;
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
 * @return {number[]}
 */
var preorderTraversal = function (root) {

};

var postorderTraversal = function (root) {

};

var inorderTraversal = function (root) {

};