/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
    const res = [];
    const path = [];

    const dfs = (startIdx, sum) => {
        if(path.length === k) {
            if(sum === n) {
                res.push([...path]);
            };
            return;
        }
        for(let i = startIdx; i <= 9; i++) {
            if(sum > n) break;
            if(path.length === k) break;
            sum+=i;
            path.push(i);
            dfs(i+1,sum);
            sum-=i;
            path.pop();
        }
    };

    dfs(1,0);
    return res;
};

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {

};

