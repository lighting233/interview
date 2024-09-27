/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if(numRows === 1 || s.length <= numRows ) return s;
    const row = [];
    for(let i = 0; i < numRows; i++) {
        row[i] = ''
    };
    let dir = -1;
    let idx = 0;
    for(let i = 0; i < s.length; i++) {
        row[idx]+=s[i];
        if(idx === 0 || idx === row.length - 1) {
            dir = dir * (-1);
        };
        idx+=dir;
    };

    let res = '';
    for(let line of row) {
        res+=line;
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