//24-9-2 第一次学习

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    const res = [];
    const path = [];
    const len = s.length;

    const dfs = (startIdx) => {
        //todo "101023" "10.10.23"可能少于 4 组
        if(path.length === 4 && startIdx === len) {
            res.push(path.join('.'));
            return;
        };

        for(let i = startIdx; i < len; i++) {
            const str = s.slice(startIdx,i + 1);
            if(path.length === 4) break;
            if(str.length > 1 && str[0] == 0) break;
            if(Number(str) > 255) break;
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
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    const res = [];
    const path = [];

    const dfs = () => {
    
    };
    dfs();
    return res;
};