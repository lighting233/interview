function customNew(constructorFunc,...args) {
    const obj = Object.create(constructorFunc.prototype);
    const result = constructorFunc.apply(obj,args);
    if(result !== null && typeof result === 'object') {
        return result
    }
    return obj
}