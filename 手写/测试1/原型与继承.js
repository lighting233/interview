//todo 1.手写new
function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    //todo 
    // const res = constructor.apply(this,args);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}
//todo 2.手写Object.create
Object.prototype.meyCreate = function(prototype) {
    //todo
    if(typeof prototype !== 'object' || typeof prototype !== 'function') {
        throw new TypeError('xxx')
    }
    function F(){};
    F.prototype = prototype;
    return new F();
}
//todo 3.手写instancseOf
function myInstanceOf(obj, constructor) {
    if(typeof obj !== 'object' || typeof obj !== 'function' || obj === null) {
        return false;
    };
    if(typeof constructor !== 'function') {
        throw new TypeError('xxx');
    };
    let curPrototype = Object.getPrototypeOf(obj);
    const originPrototype = constructor.prototype;

    while(curPrototype) {
        if(curPrototype === originPrototype) return true;
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

extends (SubType, SuperType);

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
};

SubType.prototype.sayAge = function () {
    alert(this.age);
};

function extends (subType, superType) {
    //todo
    Object.setPrototypeOf(superType);
    const prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
};

//todo 5.写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
// 要求：
// 1、不能使用全局变量
// 2、直接调用Foo()也会返回实例化的对象
// 3、实例化的对象必须是Foo的实例

let Foo = (function () {
    //todo 
    // this.n = 0;
    let times = 0;
    return function Foo() {
        if (!new.target) {
            //if(!this instanceof Foo)
            return new Foo();
        };
        //todo 
        // this.n++;
        times++;
        this.id = times;
    }
}())