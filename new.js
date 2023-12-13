function customNew(constructorFunc,...args) {
    const obj = Object.create(constructorFunc.prototype);
    const result = constructorFunc.apply(obj,args);
    if(result !== null && typeof result === 'object') {
        return result
    }
    return obj
}

function customNew(constructor,...args) {
    //创建一个新的空对象，并将其原型链指向构造函数的原型对象
    const newObj = Object.create(constructor.prototype);
    // 调用构造函数，并将this绑定到新对象上
    const result = constructor.apply(newObj,args);
    //todo instanceof
    // 如果构造函数显式返回了一个对象，则返回该对象；否则返回新对象
    return result instanceof Object ? result : newObj;
}

function customCreate(prototype) {
    function F() {} // 创建一个空的构造函数
    F.prototype = prototype; // 将构造函数的原型设置为传入的原型对象
    return new F(); // 创建并返回一个新对象，继承传入的原型对象的属性和方法
}

function createObject(proto) {
    if(typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null')
    }
    function F(){}
    F.prototype = proto;

    return new F();
}