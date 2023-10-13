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