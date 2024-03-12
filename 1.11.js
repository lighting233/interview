function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}

//redux中间件
function compose(...fn) {
    if (!fn.length) {
        return (arg) => arg
    }
    if (fn.length === 1) {
        return fn[0]
    }

    const res =  fn.reduce((pre, cur) => {
        console.log(pre)
        console.log(cur)
        return (...args) => {
            return pre(cur(...args))
        }
    })
    return res;
}

//fn4(fn3(fn2(fn1(1))))
const a = compose(fn4, fn3, fn2, fn1);
console.log("%c Line:24 🍞 a", "color:#ea7e5c", a);

// console.log(a(1));