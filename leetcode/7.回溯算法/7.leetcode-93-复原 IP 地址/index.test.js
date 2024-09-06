/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    const res = [];
    const path = [];

    const dfs = (startIdx) => {
        if(startIdx === s.length) {
            if(path.length === 4) {
                res.push(path.join('.'));
                return;
            }
        }
        for(let i = startIdx; i < s.length; i++) {
            const str = s.slice(startIdx,i+1);
            if(str.length > 1 && str[0] === '0') break;
            if(Number(str) > 255) break;
            path.push(str);
            dfs(i + 1);
            path.pop();
        }
    };

    dfs(0);
    return res;
};

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {

};

