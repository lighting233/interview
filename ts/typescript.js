"use strict";
let p = {
    id: 1,
    name: 'zhufeng',
    company: {}
};
var namespaceB;
(function (namespaceB) {
    let p = {
        name: 'zhufeng',
        age: 11
    };
    p.name = 'jiagou';
    // p.age = 11;
})(namespaceB || (namespaceB = {}));
function getUser(a, b) {
    return { name: 'zhufeng', age: 10 };
}
//获取类的构造函数的参数类型 ConstructorParameters
class Person8 {
    constructor(name) {
        this.name = name;
    }
    getName() { console.log(this.name); }
}
const conFun = Person8;
const instanceFun = new Person8('123');
let instance = {
    name: 'zf',
    getName() { }
};
//T1 & T2 交集 交叉类型
let t33 = { name: '', age: 10 };
const t44 = { name: '123' };
const t55 = { age: 123 };
