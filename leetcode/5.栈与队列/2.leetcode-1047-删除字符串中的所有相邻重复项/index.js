//24-8-16 第一次学习

/**
 * @param {string} s
 * @return {string}
 */
 var removeDuplicates = function(s) {
    const stack = [];
    for(let i = 0; i < s.length; i++) {
        if(stack.length && stack.at(-1) === s[i]) {
            stack.pop();
        }else {
            stack.push(s[i])
        }
    }
    return stack.join('')
 };

/**
 * @param {string} s
 * @return {string}
 */
 var removeDuplicates = function(s) {

 };