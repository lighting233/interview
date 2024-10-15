//todo 1.手写new

//todo 2.手写Object.create

//todo 3.手写instancseOf

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

};

//todo 5.写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
// 要求：
// 1、不能使用全局变量
// 2、直接调用Foo()也会返回实例化的对象
// 3、实例化的对象必须是Foo的实例

let Foo = (function() {
    //todo 
    // this.n = 0;
    let times = 0;
    return function Foo() {
        if(!new.target) {
            //if(!this instanceof Foo)
            return new Foo();
        };
        //todo 
        // this.n++;
        times++;
        this.id = times;
    }
}())