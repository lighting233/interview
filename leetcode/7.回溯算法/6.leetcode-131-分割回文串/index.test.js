/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const res = [];
    const path = [];

    function isHuiWen(s,left,right) {
        while(left < right) {
            if(s[left] !== s[right]) return false;
            left++;
            right--;
        };
        return true;
    }

    const dfs = (startIdx) => {
        if(startIdx === s.length) {
            res.push([...path]);
            return;
        }
        for(let i = startIdx; i < s.length; i++) {
            const str = s.slice(startIdx,i+1);
            if(!isHuiWen(s,startIdx,i)) continue;
            path.push(str);
            dfs(i+1);
            path.pop();
        }
    };

    dfs(0);
    return res;
};

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {

};

