/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
    const res = [];
    const path = [];

    const dfs = (startIdx) => {
        if(path.length > 1) {
            res.push([...path]);
        };

        const set = new Set();
        for(let i = startIdx; i < nums.length; i++) {
            if(set.has(nums[i])) continue;
            if(path.length && nums[i] < path.at(-1)) continue;
            set.add(nums[i]);
            path.push(nums[i]);
            dfs(i+1);
            path.pop();
            //todo 同层比较，不需要 delete
            // set.delete(nums[i])
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

};

