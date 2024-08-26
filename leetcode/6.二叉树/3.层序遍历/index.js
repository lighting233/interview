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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    const res = [];
    if(root === null) return res;
    const queue = [root];

    while(queue.length) {
        let len = queue.length;
        const line = [];

        while(len) {
            const node = queue.shift();
            line.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;
        }
        res.push(line);
    };

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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if(root === null) return [];
    const res = [];
    const queue = [root];

    while(queue.length) {
        let len = queue.length;
        const line = [];

        while(len) {
            const node = queue.shift();
            line.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;
        };

        res.push(line);
    }

    return res;
};