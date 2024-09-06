/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const res = [];
    const path = [];

    const dfs = (startIdx) => {
        if(path.length === k) {
            res.push([...path]);
            return;
        }
        for(let i = startIdx; i + (k - (path.length + 1)) <= n; i++) {
            path.push(i);
            dfs(i + 1);
            path.pop();
        }
    };

    dfs(1);
    return res;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {

};

