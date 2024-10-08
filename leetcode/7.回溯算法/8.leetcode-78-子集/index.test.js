/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const res = [];
    const path = [];

    const dfs = (startIdx) => {
        res.push([...path]);

        for(let i = startIdx; i < nums.length; i++) {
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
var subsets = function (nums) {
    const res = [];
    const path = [];

    const dfs = (startIdx) => {
        for(let i = startIdx; i < nums.length; i++) {
        
        }
    };

    dfs(0);
    return res;
};

