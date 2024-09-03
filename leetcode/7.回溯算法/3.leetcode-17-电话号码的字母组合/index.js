//24-9-2 第一次学习

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    //digits的 length 相当于递归的深度
    //每个按键的字母相当于单层递归的集合，横向遍历
    const map = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'];
    const res = [];
    let path = [];
    if(digits.length === 0) return res;
    const len = digits.length;
    if(len === 1) return map[digits].split('')
    const backtracking = (digitsIdx) => {
        if(path.length === len) {
            res.push(path.join(''));
            return;
        };
        const curLetter = map[digits[digitsIdx]]
        for(let i = 0; i < curLetter.length; i++) {
            path.push(curLetter[i])
            backtracking(digitsIdx + 1);
            path.pop();
        }
    };
    backtracking(0);

    return res;
};

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    const map = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'];
    const res = [];
    if(digits.length === 0) return res;
    const path = [];
    const len = digits.length;

    const dfs = (digitsIdx) => {
        if(digitsIdx === len) {
            res.push(path.join(''));
            return;
        };
        const curLetter = map[digits[digitsIdx]];
        for(let char of curLetter) {
            path.push(char);
            dfs(digitsIdx + 1);
            path.pop();
        }
    };
    dfs(0);

    return res;
};

letterCombinations('23');