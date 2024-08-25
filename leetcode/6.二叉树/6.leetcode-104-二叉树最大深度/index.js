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
 * @return {number}
 */
 var maxDepth = function(root) {
    let deepth = 0;
    if(root === null) return 0;
    const queue = [root];

    while(queue.length) {
        let len = queue.length;

        while(len) {
            const node = queue.shift();
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;
        }
        deepth++;
    };

    return deepth;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**后序遍历
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {

    const getDeep = (root) => {
        if(root === null) return 0;
        const leftDeep = getDeep(root.left);
        const rightDeep = getDeep(root.right);
        return 1 + Math.max(leftDeep,rightDeep); 
    };

    return getDeep(root);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**前序遍历
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
    let max = -Infinity;

    const dfs = (root,count = 0) => {
        if(root === null) {
            max = Math.max(max,count);
            return;
        };
        count++;
        dfs(root.left,count);
        dfs(root.right,count);
    };
    dfs(root,0);

    return max;
    
};