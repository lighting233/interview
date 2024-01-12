var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Father = /** @class */ (function () {
    function Father() {
    }
    return Father;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Child;
}(Father));

//Child.__proto__ === Function.prototype
//Child.__proto__ === Father

//function Child.prototype === Child.prototype
//function Child.prototype === new __()

//function __.prototype === Father.prototype
//function Child.prototype.__proto__ === Father.prototype
//function Child.prototype.constructor === Child

// ES5继承（构造函数 + 原型链）
function AnimalES5(name: string) {
    this.name = name;
}

AnimalES5.prototype.sayName = function () {
    console.log("My name is " + this.name);
};

function DogES5(name: string, breed: string) {
    AnimalES5.call(this, name); // 调用父类构造函数
    this.breed = breed;
}

DogES5.prototype = Object.create(AnimalES5.prototype); // 设置原型链
DogES5.prototype.constructor = DogES5; // 修复构造函数

DogES5.prototype.sayBreed = function () {
    console.log("My breed is " + this.breed);
};

// 示例用法
const dogES5 = new DogES5("Max", "Golden Retriever");
dogES5.sayName(); // 输出 "My name is Max"
dogES5.sayBreed(); // 输出 "My breed is Golden Retriever"

class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }
}
class Student extends Person {
    stuNo: number;
    constructor(name: string, age: number, stuNo: number) {
        super(name, age);
        this.stuNo = stuNo;
    }
    getStuNo() {
        return this.stuNo;
    }
}
let s1 = new Student('zhufeng', 11, 1);

var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());

var Student = (function (_super) {
    __extends(Student, _super);//简化extends
    function Student(name, age, stuNo) {
        var _this = _super.call(this, name, age) || this; //调用父类构造函数
        _this.stuNo = stuNo;
        return _this;
    }
    Student.prototype.getStuNo = function () {
        return this.stuNo;
    };
    return Student;
}(Person));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

//简化__extends
var extends = function(child,super) {
    Object.setPrototypeOf(child, super); //child.__proto__ = super; child可以继承Person上的静态属性
    function F() {
        this.constructor = child;
    }
    F.prototype = super.prototype;
    child.prototype = new F(); //child.prototype.__proto__ = F.prototype;
}

var Child = (function (super) {
    extends (Child, super);
    function Child(name) {
        var _this = super.call(this, name) || this;
        _this.name = name;
        return this;
    }
    Child.prototype.sayName = function () {
        console.log(this.name)
    }
    return Child;
} (Parent))


function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    alert(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

function extends(subType, superType) {
    Object.setPrototypeOf(subType, superType);  //child.__proto__ = super; child可以继承Person上的静态属性
    var prototype = Object.create(superType.prototype);     //创建对象     
    prototype.constructor = subType;              //增强对象     
    subType.prototype = prototype;               //指定对象 
} 
 

extends (SubType, SuperType);

SubType.prototype.sayAge = function () {
    alert(this.age);
}