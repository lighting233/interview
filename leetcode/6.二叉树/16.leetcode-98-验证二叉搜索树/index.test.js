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
var isValidBST = function (root) {
    let prev = null;

    const inorder = (root) => {
        if(root === null) return true;
        const left = inorder(root.left);
        //todo >=
        // if(prev !== null && prev.val > root.val) {
        if(prev !== null && prev.val >= root.val) {
            return false;
        };
        prev = root;
        const right = inorder(root.right);
        return right && left;
    };

    return inorder(root);
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
var isValidBST = function (root) {
    let prev = null;
    
    const dfs = (root) => {
        if(root === null) return true;
        //todo dfs
        // const left = isValidBST(root.left);
        const left = dfs(root.left);
        if(!left) return false;
        if(prev && prev.val >= root.val) return false;
        prev = root;
        // const right = isValidBST(root.right);
        const right = dfs(root.right);
        if(!right) return false;

        return true;
    }
    return dfs(root);
};