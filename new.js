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

function myNew(constructor, ...args) {
    // 创建一个空对象，作为新对象实例
    const newObj = {};
  
    // 将新对象的原型指向构造函数的原型
    Object.setPrototypeOf(newObj, constructor.prototype);
  
    // 将构造函数的 this 指向新对象，并执行构造函数
    const result = constructor.apply(newObj, args);
  
    // 如果构造函数返回一个对象，则返回该对象；否则，返回新创建的对象
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

function Parent() {
}
Parent.prototype.say = function() {
}
const a = Object.create(Parent.prototype);
console.log(a);
console.log(a.constructor)
const b = customCreate(Parent.prototype);
console.log(b);
console.log(b.constructor)
