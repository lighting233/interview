Array.prototype.myMap = fucntion(callback,context) {
    if(typeof callback !== 'function') {
        throw new Error('')
    };

    context = context || window;

    const result = [];

    for(let i = 0; i < this.length; i++) {
        result.push(callback.call(context,this[i],i,this))
    };
    return result;

}

Array.prototype.myMap2 = fucntion(callback,context) {
    if(typeof callback !== 'function') {
        throw new Error('')
    };

    context = context || window;

    return this.reduce((prev,cur,index,array) => {
        return prev.concat(callback.call(context,cur,index,array))
    },[])

}

Array.prototype.filter = fucntion(callback,context) {
    if(typeof callback !== 'function') {
        throw new Error('')
    };

    context = context || window;

    const result = []
    for(let i = 0; i < this.length; i++) {
        const item = callback.call(context,this[i],i,this);
        item && result.push(this[i]);
    };

    return result;
}