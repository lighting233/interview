//24-9-2 第一次学习

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const res = [];
    const path = [];
    //1.确定参数和返回值, startIdx为每层递归开始的位置
    const backtracking = (n,k,startIdx) => {
        //2.确定终止条件
        if(path.length === k) {
            res.push([...path]);
            return;
        }
        //3.确定单层递归逻辑 [1,2,3,4]
        //k - path.length是还要取的个数，n 减去他们的差就是 i 能达到的最大值，由于当前循环还没有加 i，但在循环里会加上，所以 path.length需要加一
        // i <= n - (k - (path.length + 1))
        for(let i = startIdx; i + (k - (path.length + 1)) <= n; i++) {
            path.push(i);
            backtracking(n,k,i+1);
            path.pop();
        };
    };
    backtracking(n,k,1);
    return res;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {

};