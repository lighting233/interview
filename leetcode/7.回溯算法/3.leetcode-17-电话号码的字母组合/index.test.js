/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    const map = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'];
    const res = [];
    const path = []
    //todo
    if(digits.length === 0) return res;
    const dfs = (digitsIdx) => {
        if(digitsIdx === digits.length) {
            res.push(path.join(''));
            return;
        };
        const curLetter = map[digits[digitsIdx]];
        for(let char of curLetter) {
            path.push(char);
            dfs(digitsIdx+1);
            path.pop();
        }
    };

    dfs(0);

    return res;
};

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {

};

