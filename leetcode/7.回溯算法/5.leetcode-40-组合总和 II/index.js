//24-9-2 第一次学习

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    candidates.sort((a,b) => a - b);
    const res = [];
    const path = [];
    let sum = 0;

    const backtracking = (startIdx) => {
        if(sum === target) {
            res.push([...path]);
            return;
        };

        for(let i = startIdx; i < candidates.length; i++) {
            //求的是组合，横向有重复元素会导致有重复的组合，例如[2,2,2,2,6],target = 8
            if(i > startIdx && candidates[i] === candidates[i - 1]) continue;
            if(sum > target) break;
            sum+=candidates[i];
            path.push(candidates[i]);
            //candidates 中的每个数字在每个组合中只能使用 一次 ，所以纵向要+1，不能使用重复元素，但是不同的元素数值相同可以使用
            backtracking(i + 1);
            sum-=candidates[i];
            path.pop();
        }
    };
    backtracking(0);

    return res;
};
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {

};