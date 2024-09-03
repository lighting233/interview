//24-9-2 第一次学习

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const res = [];
    const path = [];

    function isHuiwen(s, left, right) {
        while(left < right) {
            if(s[left] !== s[right]) {
                return false;
            };
            left++;
            right--;
        };
        return true;
    }

    const backtracking = (startIdx) => {
        //终止条件，startIdx就是切割线，切到末尾，证明结束了
        if(startIdx === s.length) {
            res.push([...path]);
            return;
        };

        //分割不是组合，[a,a,a]['a','aa'],['aa','a']是两种切割方案
        for(let i = startIdx; i < s.length; i++) {
            if(!isHuiwen(s,startIdx,i)) continue;
            const str = s.slice(startIdx, i + 1);
            path.push(str);
            backtracking(i + 1);
            path.pop();
        }
    };

    backtracking(0);

    return res;
};

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const res = [];
    const path = [];

    function isHuiwen(s,left,right) {
        while(left < right) {
            if(s[left] !== s[right]) {
                return false;
            }
    
            left++;
            right--;
        }

        return true;
    };

    const dfs = (startIdx) => {
        if(startIdx === s.length) {
            res.push([...path]);
            return;
        };
        for(let i = startIdx; i < s.length; i++) {
            if(!isHuiwen(s,startIdx,i)) continue;
            const str = s.slice(startIdx, i + 1);
            path.push(str);
            dfs(i + 1);
            path.pop();
        }
    };
    dfs(0);

    return res;
};