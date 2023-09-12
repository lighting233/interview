function customNew(constructorFunc,...args) {
    const obj = Object.create(constructorFunc.prototype);
    const result = constructorFunc.apply(obj,args);
    if(result !== null && typeof result === 'object') {
        return result
    }
    return obj
}

function customCreate(prototype) {
    function F() {} // 创建一个空的构造函数
    F.prototype = prototype; // 将构造函数的原型设置为传入的原型对象
    return new F(); // 创建并返回一个新对象，继承传入的原型对象的属性和方法
}