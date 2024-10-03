//todo 1.下面是一个加强版的 promiseAll 函数，它可以限制并发数量，并按顺序发送和返回结果：
function promiseAllWithLimit(promises, limit) {

};

//todo 2.实现一个 scheduler 函数，满足以下要求：
/**
 * 1.接收一个参数 max 控制最大并发请求量
 * 2.执行以下代码依次输出：2、3、1、4
 */
const request1 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });

const request2 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 500);
    });
const request3 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 300);
    });
const request4 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(4);
        }, 400);
    });

const addRequest = scheduler(2);

addRequest(request1).then(res => {
    console.log(res);
});
addRequest(request2).then(res => {
    console.log(res);
});
addRequest(request3).then(res => {
    console.log(res);
});
addRequest(request4).then(res => {
    console.log(res);
});

function scheduler(max) {

};

//todo 3.改动以下代码，使最终打印的数字顺序 与 遍历的顺序一致。即 0，1，2，..., 9
const request = (i) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000)
    })
};
//改动
for (let i = 0; i < 10; i++) {
    request(i).then(res => console.log(res))
};
//todo 3.1

//todo 3.2

//todo 4.实现一个带有时间限制的fetch请求,时间内可以正常resolve,超出时限直接reject
// Example
fetchWithTimeout('https://your.api/endpoint')
    .then(response => console.log('Response:', response))
    .catch(error => console.error('Error:', error));

function fetchWithTimeout(url, timeout = 300000) {
    
};

//todo 5. 实现睡眠函数 new LazyLog().log(1).sleep(1000).log(2).log(3).execute();

class LazyLog {
    
}