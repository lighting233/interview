//24-9-22 第一次学习

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    // 如果行数为1或字符串长度不超过行数，直接返回原字符串
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }
    //初始每行
    const row = [];
    for(let i = 0; i < numRows; i++) {
        row[i] = '';
    };
    //todo 方向初始化成-1,最开始才能正向走
    let dir = 1;
    //目前处于哪行
    let idx = 0;
    for(let char of s) {
        row[idx]+=char;
        if(idx === 0 || idx === numRows - 1) {
            dir = dir * (-1);
        };
        idx+=dir;
    };
    let res = '';
    for(let i = 0; i < row.length; i++) {
        res += row[i]
    };

    return res;
};
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {

};