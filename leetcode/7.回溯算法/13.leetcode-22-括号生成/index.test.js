/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];

    const dfs = (left, right, str) => {
        if(str.length === 2 * n) {
            res.push(str);
            return;
        };

        if(left) {
            //todo left, right不是n
            dfs(left - 1, right, str + '(');
        };

        if(right > left) {
            dfs(left, right- 1, str + ')');
        }
    };
    dfs(n,n,'');

    return res;
};

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {

};