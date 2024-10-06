//todo 1.手写map
Array.prototype.myMap = fucntion(callback, context) {
    if (typeof callback !== 'function') {
        throw new Error('');
    }
    context = context || globalThis;
    const res = [];
    for (let i = 0; i < this.length; i++) {
        res[i] = callback.call(context, this[i], i, this);
    };
    return res;
}

Array.prototype.myMap2 = fucntion(callback, context) {
    if (typeof callback !== 'function') {
        throw new Error('');
    }
    context = context || globalThis;
    return this.reduce((prev, cur, index, arr) => {
        return prev.concat(callback.call(context, cur, index, arr))
    }, []);
};

//todo 2.手写filter
Array.prototype.filter = fucntion(callback, context) {
    if (typeof callback !== 'function') {
        throw new Error('');
    }
    context = context || globalThis;
    const res = [];
    for (let i = 0; i < this.length; i++) {
        const isTrue = callback.call(context, this[i], i, this);
        if (isTrue) {
            res.push(this[i]);
        }
    };
    return res;
};

//todo 3.reduce
Array.prototype.myReduce = function (fn, initVal) {
    const arr = this;
    let res = initVal || arr[0];
    arr.forEach((item, index) => {
        res = fn.apply(arr, [res, item, index, arr])
    })
    return res
}