//todo 1.手写new

function customNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
};

//todo 2.手写Object.create

function customCreate(prototype) {
    //prototype可以为null,创建一个没有原型的空对象{} No properties
    if (typeof prototype !== 'object' || typeof prototype !== 'function') {
        throw new TypeError('xxx')
    }
    function F() { };
    F.prototype = prototype;
    return new F();
};

//todo 3.手写instancseOf: 检测一个实例对象是否是某个构造函数的实例

//Promise, Object都是函数 typeof Object === 'object'为false
function instanceof (obj, constructor) {
    if (typeof constructor !== 'function') {
        throw new TypeError('xxx')
    };
    if (typeof obj !=== 'object' || typeof obj === null || typeof obj !== 'function') {
        return false;
    };
    const sourceProto = constructor.prototype;
    let curPrototype = Object.getPrototypeOf(obj);

    while (curPrototype !== null) {
        if (curPrototype === sourceProto) {
            return true;
        };
        curPrototype = Object.getPrototypeOf(curPrototype);
    };

    return false;
};

//todo 4.手动实现extends

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    alert(this.name);
};

//1.子类继承父类静态属性和原型
extends (SubType, SuperType);

function SubType(name, age) {
    //2.调用父类构造函数
    SuperType.call(this, name);
    this.age = age;
};

SubType.prototype.sayAge = function () {
    alert(this.age);
};

function extends (subType, superType) {
    //1. 子类继承静态属性
    //subType.__proto__ = superType; child可以继承Person上的静态属性
    Object.setPrototypeOf(subType, superType);
    //2. 创建子类的原型
    const prototype = Object.create(subType.prototype);
    //3. 设置constructor
    prototype.constructor = subType;
    //4. 子类自身的原型对象继承父类
    subType.prototype = prototype;
};

//todo 5.写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
// 要求：
// 1、不能使用全局变量
// 2、直接调用Foo()也会返回实例化的对象
// 3、实例化的对象必须是Foo的实例

let Foo = (function() {
    let times = 0;
    function Foo() {
        //当将一个函数作为构造函数调用时，使用 new 关键字, this 指向新创建的实例对象。
        // if(!(this instanceof foo)) {
        if(!new.target) {
            return new Foo();
        };
        times++;
        this.id = times;
    };

    return Foo;
})();

