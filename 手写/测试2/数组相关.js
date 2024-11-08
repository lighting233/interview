//todo 1.手写map
Array.prototype.myMap = fucntion(callback,context) {
    const res = [];
    for(let i = 0; i < this.length; i++) {
        res.push(callback.call(context, this[i], i, this))
    }
    return res;
}

Array.prototype.myMap2 = fucntion(callback,context) {
    return this.reduce((prev,cur, index, array) => {
        //todo
        // return prev.push(callback.call(context, cur, index, array))
        return prev.concat(callback.call(context, cur, index, array))
    }, [])

};

//todo 2.手写filter
Array.prototype.filter = fucntion(callback,context) {
    const res = [];
    for(let i = 0; i < this.length; i++) {
        const val = callback.call(context, this[i], i, this);
        if(val) {
            res.push(this[i])
        }
    }
    return res;
};

//todo 3.reduce
Array.prototype.myReduce = function (fn, initVal) {
    // initVal = initVal ? this[0] : initVal;
    // for(let i = 1; i < this.length; i++) {
    //     initVal = callback.call(context, initVal, this[i], i, this)
    // }
    // return initVal;
    let startIdx = 0;
    if(initVal === undefined) {
        if(this.length === 0) {
            return new TypeError('xxx');
        };
        initVal = this[0];
        startIdx = 1;
    };
    for(let i = startIdx; i < this.length; i++) {
        initVal = callback.call(context, initVal, this[i], i, this)
    };

    return initVal
}