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
var minDepth = function (root) {
    if (root === null) return 0;
    const queue = [root];
    let res = 1;
    while (queue.length) {
        let len = queue.length;

        while (len) {
            const node = queue.shift();
            if (node.left === null && node.right === null) return res;
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;
        }
        res++;
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
 * @return {number}
 */
var minDepth = function (root) {
    //定义函数是求当前树的最小高度，这道题用了后序遍历，求的是高度，用最小高度当作最小深度
    const getHeigth = (root) => {
        if(root === null) return 0;

        const leftHight = getHeigth(root.left);
        const rightHight = getHeigth(root.right);

        //todo 注意：这里不能直接求leftHight和rightHight的最小值加一，因为求的最小深度是叶子节点，你这个节点的左子节点为空的话返回的是 0，但你这个节点就不是叶子节点了
        if(root.left === null && root.right !== null) return 1 + rightHight;
        if(root.left !== null && root.right === null) return 1 + leftHight;
        return 1 + Math.min(leftHight,rightHight)
    };

    return getHeigth(root);
};