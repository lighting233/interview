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
Array.prototype.myReduce = function (fn, initialVal) {
    if (typeof callback !== 'function') {
        throw new TypeError('xxx');
    };
    let startIndex = 0;
    let sum = initialVal
    if(sum === undefined) {
        if(this.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        };
        sum = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
        sum = callback.call(sum, this[i], i, this);

    };
    return sum;
}