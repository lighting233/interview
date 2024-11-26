async function asy1() {
    console.log(1);
    //当 await 后的 Promise 被解析（resolved）时，事件循环会将 await 后的代码放入微任务队列（microtask queue）。
    await asy2();
    //等待asy2完成后,加入微队列
    console.log(2);
};
asy2 = async () => {
    //执行到这相当于执行Promise.resolve(timerID)
    await setTimeout(() => {
        Promise.resolve().then(() => {
            console.log(3);
        });
        console.log(4);
    }, 0);
    //微队列里去完成asy2
};

asy3 = async () => {
    Promise.resolve().then(() => {
        console.log(6)
    })
};

asy1();
console.log(7);
asy3();