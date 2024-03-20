

function fn1(props) {
    console.log("fn1");
    props.b = 2;
    return props;
}

function fn2(props) {
    console.log("fn2");
    props.c = 3;
    return props;
}

function fn3(props) {
    console.log("fn3");
    console.log(props);
    return props;
}
//redux中间件
// function compose(...fn) {
//     if (!fn.length) {
//         return (arg) => arg
//     }
//     if (fn.length === 1) {
//         return fn[0]
//     }

//     const res =  fn.reduce((pre, cur) => {
//         return (...args) => {
//             return pre(cur(...args))
//         }
//     })
//     return res;
// }
function compose(...fns) {
    return function(initialArg) {
        return fns.reduceRight((currentArg, currentFn) => {
            return currentFn(currentArg);
        }, initialArg);
    };
}
//fn4(fn3(fn2(fn1(1))))
const a = compose(fn1, fn2, fn3)({ a: 1 });
console.log("%c Line:24 🍞 a", "color:#ea7e5c", a);
