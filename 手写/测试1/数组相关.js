//todo 1.手写map
Array.prototype.myMap = fucntion(callback, context) {
    //todo 
    if (typeof callback !== 'function') {
        throw new Error('');
    }
    context = context || globalThis;



    const res = [];
    for (let i = 0; i < this.length; i++) {
        res[i] = callback.call(context, this[i], i, this)
    }
    return res;
}

Array.prototype.myMap2 = fucntion(callback, context) {
    //todo 
    if (typeof callback !== 'function') {
        throw new Error('');
    }
    context = context || globalThis;


    return this.reduce((prev, cur, index, arr) => {
        return prev.concat(callback.call(context, cur, index, arr))
    }, [])

};

//todo 2.手写filter
Array.prototype.filter = fucntion(callback, context) {
    if (typeof callback !== 'function') {
        throw new TypeError('xxx');
    };
    context = context || globalThis;
    const res = [];
    for (let i = 0; i < this.length; i++) {
        const isTrue = callback.call(context, this[i], i, this);
        if (isTrue) res.push(this[i]);
    };
    return res;
}

//todo 3.reduce
Array.prototype.reduce = function (callback, initialVal) {
    
}