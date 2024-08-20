 //24-8-20 第二次测试


/**
 * @param {string[]} tokens
 * @return {number}
 */
 var evalRPN = function(tokens) {
    const stack = [];

    const operationMap = {
        '+': (a,b) => a + b,
        '*': (a,b) => a * b,
        '-': (a,b) => b - a,
        '/': (a,b) => Math.trunc(b / a)
    };

    for(let i = 0; i < tokens.length; i++) {
        //todo >= 2
        if(stack.length >= 2 && operationMap[tokens[i]]) {
            const a = stack.pop();
            const b = stack.pop();
            stack.push(operationMap[tokens[i]](a,b))
        }else {
            //todo number
            stack.push(Number(tokens[i]))
        }
    }

    return stack[0]
 };

