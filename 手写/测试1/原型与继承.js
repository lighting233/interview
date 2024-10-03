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

extends(SubType, SuperType);

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
};

SubType.prototype.sayAge = function () {
    alert(this.age);
};

function extends(subType, superType) {
    
}; 