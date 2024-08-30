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
 * @return {TreeNode}
 */
var invertTree = function (root) {
    if (root === null) return root;
    const queue = [root];

    while (queue.length) {
        let len = queue.length;

        while (len) {
            const node = queue.shift();
            [node.left, node.right] = [node.right, node.left];
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;
        }
    };

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
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    const dfs = (root) => {
        if (root === null) return;
        [root.left, root.right] = [root.right, root.left];
        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    return root;
};