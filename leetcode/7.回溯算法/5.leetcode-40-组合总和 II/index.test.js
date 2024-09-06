/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    candidates.sort((a,b) => a - b);
    const res = [];
    const path = [];

    const dfs = (startIdx, sum) => {
        if(sum === target) {
            res.push([...path]);
            return;
        }
        for (let i = startIdx; i < candidates.length; i++) {
            const num = candidates[i];
            if(i > startIdx && candidates[i - 1] === num ) continue;
            if(sum + num > target) break;
            path.push(num);
            sum+=num;
            dfs(i + 1, sum);
            sum-=num;
            path.pop();
        }
    };

    dfs(0, 0);
    return res;
};
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {

};

