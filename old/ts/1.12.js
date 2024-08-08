"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    constructor(name) {
        this.name = name;
    }
    static say() {
        return '123';
    }
}
let wc = Animal; //描述类， typeof Animal 获取的是类的构造函数
function createClass(clazz, name) {
    return new clazz(name);
}
let a = createClass(Animal, 'zhufeng'); //Animal 修饰类的实例
function create(c) {
    return new c();
}
const user = {
    profile: {
        name: null,
        age: 25
    }
};
const name = (_a = user.profile.name) !== null && _a !== void 0 ? _a : 'Anonymous';
const age = (_b = user.profile.age) !== null && _b !== void 0 ? _b : 18;
console.log(name); // "Anonymous" (因为 user.profile.name 是 null)
console.log(age); // 2
