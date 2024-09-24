//24-9-24 第一次学习

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const stack = [];
    const arr = path.split('/');

    for(let item of arr) {
        if(item === '..') {
            stack.pop();
        }else if(item === '.') {
            continue;
        }else if(item !== '') {
            stack.push(item);
        };
    };

    return '/' + stack.join('/')
};

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {

};