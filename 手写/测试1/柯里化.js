//todo 1.示例使用
function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

const add2 = curriedAdd(2);
const add2and3 = add2(3);

console.log(add2and3(4)); // 输出: 9

//todo 2.示例使用
function calculate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
    }
}

console.log(calculate('+', 5, 3)); // 输出: 8
console.log(calculate('-', 5, 3)); // 输出: 2


function curryCalculate(operator) {
    return function (operand1) {
        return function (operand2) {
            switch (operator) {
                case '+':
                    return operand1 + operand2;
                case '-':
                    return operand1 - operand2;
                case '*':
                    return operand1 * operand2;
                case '/':
                    return operand1 / operand2;
            }
        };
    };
}

const add = curryCalculate('+');
const subtract = curryCalculate('-');

const add5 = add(5);
const subtract3 = subtract(3);

console.log(add5(3)); // 输出: 8
console.log(subtract3(5)); // 输出: 2

//todo 1. curry
function curry(func) {
    return function curried(...args) {
        if(args.length >= func.length) {
            return func(...args);
        }else {
            return function(...restArgs) {
                return curried(...args, ...restArgs)
            }
        }
    }
}
