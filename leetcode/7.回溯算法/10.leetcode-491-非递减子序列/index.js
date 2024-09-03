//24-9-3 第一次学习

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
    //todo 不能排序
    // nums.sort((a,b) => a - b);
    const res = [];
    const path = [];

    const dfs = (startIdx) => {
        if(path.length > 1) {
            res.push([...path]);
            //todo 没有 return
            // return;
        };
        const set = new Set();
        for(let i = startIdx; i < nums.length; i++) {
            //todo [1,2,3,4,5,6,7,8,9,10,1,1,1,1,1] 没排序不能这样剪枝
            // if(i > startIdx && nums[i - 1] === nums[i]) break;
            if(set.has(nums[i])) continue;
            //todo 需要比较大小
            if(path.length && nums[i] < path.at(-1)) continue;
            set.add(nums[i])
            path.push(nums[i]);
            dfs(i + 1);
            path.pop();
        }
    };
    dfs(0);
    return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
    const res = [];
    const path = [];

    const dfs = () => {
    
    };
    dfs();
    return res;
};