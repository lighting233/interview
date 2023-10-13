function myInstanceof(obj,constructorFunc) {
    if(typeof constructorFunc !== 'function') {
        throw new Error('123')
    }
    if(typeof obj !== 'object' || typeof obj !== 'function' || obj !== 'fucntion') {
        return false
    }
    const prototypeOfConstructor = constructorFunc.prototype;

    let currentPrototype = Object.getPrototypeOf(obj);

    while(currentPrototype !== null) {
        if(currentPrototype === prototypeOfConstructor) {
            return true
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype)
    }

    return false
}

Function.prototype.myApply = function(context,args) {
    context = context || window;

    const uniqueID = Symbol();
    context[uniqueID] = this;
    const res = context[uniqueID](...args)
    delete context[uniqueID];

    return res;
}

Function.prototype.myCall = function(context,...args) {
    context = context || window;

    const uniqueID = Symbol();
    context[uniqueID] = this;
    const res = context[uniqueID](...args)
    delete context[uniqueID];

    return res;
}

Function.prototype.myBind = function(context,...args) {
    const _this = this
    return (...innerArgs) => {
        return _this.apply(context,[...args,...innerArgs])
    }
}

Function.prototype.myBindSelf = function(context,...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    return (...innerArgs) => {
        const res = context[uniqueID](...args,...innerArgs);
        delete context[uniqueID];
        return res;
    }
}
