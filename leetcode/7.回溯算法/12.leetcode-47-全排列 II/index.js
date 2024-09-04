//24-9-4 第一次学习

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    nums.sort((a,b) => a - b);
    const res = [];
    const path = [];

    const dfs = (used) => {
        if(path.length === nums.length) {
            res.push([...path]);
            return;
        };
        for(let i = 0; i < nums.length; i++) {
            //used[i - 1]为 true，并且nums[i - 1] === nums[i]说明是纵向取值，下一层的值和上一层的相等
            //used[i - 1]为false,并且nums[i - 1] === nums[i]说明横向取值，for 循环的当前值和前一个值相等
            if(i > 0 && used[i - 1] !== true && nums[i - 1] === nums[i]) continue;
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
var permuteUnique = function (nums) {
    nums.sort((a,b) => a -b);
    const res = [];
    const path = [];

    const dfs = (used) => {
        if(path.length === nums.length) {
            res.push([...path]);
            return;
        };

        for(let i = 0; i < nums.length; i++) {
            //todo nums = [1,1,2] 纵向第二行也不能取 1 了
            // if(i > 0 && nums[i] === nums[i - 1]) continue;
            if(i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
            if(used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            dfs(used);
            path.pop();
            used[i] = false;
        }
    };
    dfs([]);
    return res;
};