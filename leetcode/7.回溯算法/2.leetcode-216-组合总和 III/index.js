//24-9-2 第一次学习

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
    const res = [];
    const path = [];
    let sum = 0;

    const backtarcking = (k,n, startIdx) => {
        if(sum > n) return;
        if(path.length === k) {
            if(sum === n) {
                res.push([...path]);
            }
            return;
        };
        for(let i = startIdx; i + (k - (path.length + 1)) <= 9; i++) {
            sum+=i;
            //在这判断 sum 的话，还要在 break 前进行回溯操作 sum-=i
            // if(sum > n) break;
            path.push(i);
            //todo i + 1,而不是startIdx + 1
            // backtarcking(k,n,startIdx + 1);
            backtarcking(k,n,i + 1);
            path.pop();
            sum-=i;
        }
    };
    backtarcking(k,n,1);

    return res;
};

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {

};