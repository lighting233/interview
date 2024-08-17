//24-8-16 第一次学习

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const operationMap = {
        '+': (a, b) => a + b,
        '*': (a, b) => a * b,
        '-': (a, b) => b - a,
        '/': (a, b) => Math.trunc(b / a)
    };
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
        if (operationMap[tokens[i]] && stack.length > 1) {
            //todo 栈要 pop 掉，不能用 at读取
            const a = stack.pop();
            const b = stack.pop();
            stack.push(operationMap[tokens[i]](a, b));
        } else {
            stack.push(Number(tokens[i]))
        }
    }
    return stack[0];
};

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const operationMap = {
        '+': (a,b) => a + b,
        '*': (a,b) => a * b,
        '-': (a,b) => b - a,
        '/': (a,b) => Math.trunc( b / a)
    };

    const stack = [];

    for(let i = 0; i < tokens.length; i++) {
        if(stack.length && operationMap[tokens[i]]) {
            const a = stack.pop();
            const b = stack.pop();
            stack.push(operationMap[tokens[i]](a,b))
        }else {
            //todo number
            // stack.push(tokens[i])
            stack.push(Number(tokens[i]))
        }
    }

    return stack[0]
};