//todo 1.手写new
function customerNew(constructor, ...args) {
    //todo 
    // const obj = Object.create(null);
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}
//todo 2.手写Object.create
function customerCreate(prototype) {
    //todo
    if (typeof prototype !== 'object' || typeof prototype !== 'function') {
        throw new TypeError('xxxx')
    }
    function F() { };
    F.prototype = prototype;
    return new F();
}
//todo 3.手写instancseOf
function customerInstanceOf(obj, constructor) {
    if (typeof constructor !== 'function') {
        throw new TypeError('xxx');
    };
    if (typeof obj !== 'object' || typeof obj !== 'function' || obj === null) {
        return false;
    };

    const originPrototype = constructor.prototype;
    let curPrototype = Object.getPrototypeOf(obj);

    while (curPrototype !== null) {
        if (curPrototype === originPrototype) {
            return true;
        };
        curPrototype = Object.getPrototypeOf(curPrototype);
    };

    return false;
}
//todo 4.手动实现extends

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    alert(this.name);
};

extends(SubType, SuperType);

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
};

SubType.prototype.sayAge = function () {
    alert(this.age);
};

function extends (subType, superType) {
    Object.setPrototyOf(subType, superType);
    //todo
    // const prototype = superType.prototype;
    const prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype
};

//todo 5.写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
// 要求：
// 1、不能使用全局变量
// 2、直接调用Foo()也会返回实例化的对象
// 3、实例化的对象必须是Foo的实例

const Foo = (function () {
    let id = 0;

    return function Foo() {
        //todo
        // if(!target.new) {
        if (!new.target) {
            return new Foo();
        };
        id++;
        this.id = id;
    }
})()

