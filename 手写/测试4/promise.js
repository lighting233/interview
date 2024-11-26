const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const p = new Promise((resolve, reject) => {

});

p.then((value) => {
    return p;
}, (reason) => {

});

function resolvePromise(x, promise2, resolve, reject) {
    
};

class Promise {

}

async function asyncFunc() {
    const a = await Promise.resolve(1);
    const b = await Promise.resolve(2);
    return a + b;
};

asyncFunc().then((data) => {
    console.log(data);
});

function co(generatorFunc) {
    
};

function asyncFunc2() {
    
}


