/**
 * 错误处理
 * 1.外部处理
 */
async function go() {
    const data1 = await readFile('./data/1.txt');
    const data2 = await readFile('./data/2.txt');
    const data3 = await readFile('./data/3.txt');
    return data1 + data2 + data3;
};
go().then((data) => {
    console.log("%c Line:28 🌭 data", "color:#33a5ff", data);
}).catch((error) => {
    console.log("%c Line:14 🥝 error", "color:#ffdd4d", error);
});

/**
 * 2.内部处理
 */
async function go() {
    try {
        const data1 = await readFile('./data/1.txt');
        const data2 = await readFile('./data/2.txt');
        const data3 = await readFile('./data/3.txt');
        return data1 + data2 + data3;
    } catch(error) {
        console.log("%c Line:27 🥔 error", "color:#42b983", error);
        return //return的话, console.log('inner');不执行,finally执行
    } finally {
        console.log('即使catch中return我也执行')
    }

    console.log('inner');
};
