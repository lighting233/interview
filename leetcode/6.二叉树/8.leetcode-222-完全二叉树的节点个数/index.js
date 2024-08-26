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
var countNodes = function (root) {
    //当前是满二叉树。我们可以利用这个特点向下遍历寻找满二叉树 2^k-1就是节点数，从一个节点出发，左节点和右节点遍历到底深度相等，则是满二叉树

    const getNums = (root) => {
        if(root === null) return 0;
        //todo 终止条件不止等于 0 这一个，如果左侧深度等于右侧深度返回2^k-1
        let left = root.left, right = root.right;
        let lnum = 0, rnum = 0;
        while(left) {
            left = left.left;
            lnum++;
        };
        while(right) {
            right = right.right;
            rnum++;
        };
        //todo lnim需要加 1 因为 while 时没有算根节点的高度
        if(lnum === rnum) return Math.pow(2,lnum + 1) - 1;

        //单层逻辑
        lnum = getNums(root.left);
        rnum = getNums(root.right);

        return 1 + lnum + rnum;
    };

    return getNums(root);
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
var countNodes = function (root) {
    if(root === null) return 0;
    let left = root.left, right = root.right;
    let lnum = 0, rnum = 0;
    while(left) {
        left = left.left;
        lnum++;
    } ;
    while(right) {
        right = right.right;
        rnum++;
    };
    if(lnum === rnum) {
        return Math.pow(2, lnum + 1) - 1;
    };
    lnum = countNodes(root.left);
    rnum = countNodes(root.right);

    return 1 + lnum + rnum;
};