//24-9-2 第一次学习

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
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
            // //横向剪枝，因为重复的元素已经在纵向的时候使用过了
            // if(i > startIdx && candidates[i - 1] === candidates[i]) continue;
            if(sum > target) break;
            sum+=candidates[i];
            path.push(candidates[i])
            // 2，2，3 和 3，2,2是同一种组合，每一层递归的起始，要和上一层的当前元素保持一致，不能再去寻找已经用过的了，纵向可以使用自己本身的元素，只是不用 i+1 就可以了
            backtracking(i);
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
var combinationSum = function (candidates, target) {
    candidates.sort((a,b) => a - b);
    const res = [];
    const path = [];

    const dfs = (startIdx,sum) => {
        if(sum === target) {
            res.push([...path]);
            return;
        };

        for(let i = startIdx; i < candidates.length; i++) {
            const num = candidates[i];
            //todo 在这剪枝
            if(sum + num > target) break;
            sum+=num;
            path.push(num);
            dfs(i,sum);
            sum-=num;
            path.pop();
        }
    };

    dfs(0,0);

    return res;
};