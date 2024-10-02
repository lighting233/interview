//promise + generator + yield + co 只是一个中间产物,不是最终方案
function myCo(generatorFn) {
    //1. 先生成迭代器
    const iterator = generatorFn();

    //2. 迭代器可以递归调用
    return new Promise((resolve, reject) => {
        function next(lastValue) {
            const { value, done } = iterator.next(lastValue); //{ value: Promise { <pending> }, done: false }
            //3. 递归终止条件
            if(done) {
                resolve(value);
            }else {
                value.then(next, reject);
            }
        }
        next();
    });
};