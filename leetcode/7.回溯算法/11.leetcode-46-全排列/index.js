//24-9-2 第一次学习

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const path = [];

    const dfs = (used) => {
        if(path.length === nums.length) {
            res.push([...path]);
            return;
        };
        for(let i = 0; i < nums.length; i++) {
            if(used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            dfs(used);
            used[i] = false;
            path.pop();
        }
    };
    dfs([]);
    return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const path = [];

    const dfs = () => {

    };
    dfs();
    return res;
};