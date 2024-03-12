### 1.你知道 interface 与 type 有什么区别吗？

## 1.type 定义之后就不能重新添加新的属性；而 interface 则是始终可以扩展的；即仅 inyterface 支持合并类型

interface Window {
    title: string;
}

interface Window {
    ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

type Window = {
    title: string;
}

type Window = {
    ts: TypeScriptAPI;
}

// Error: Duplicate identifier 'Window'.

## 2.interface 不能直接操作基本类型（如 string、number 这些）

type stringAlias = string; // ok
type StringOrNumber = string | number; // ok

## 3.interface 可以进行行为抽象，类似类的抽象，让 class 实现接口

//行为的抽象
//同名的接口可以写多少,类型会自动合并
//类要实现接口所有的方法
(`)
interface Speakable{
speak():void
}
interface Eatable {
eat(): void
}
class Person implements Speakable, Eatable{
name: string
say() {
}
speak() {
throw new Error("Method not implemented.")
}
eat(): void {
throw new Error("Method not implemented.")
}
}
(`)

## 4. interface 可以修饰类的构造函数

//构造函数类型

class Animal {
    constructor(public name: string) {

    }
    static say() {
        return '123'
    }

}
//如果是修饰普通函数
//加上 new 之后就是用来描述类的构造函数
interface WithNameClass {
    new(name: string): any
    say(): string
}

let wc: WithNameClass = Animal //修饰构造函数， typeof Animal 获取的是类的构造函数
function createClass(clazz: typeof Animal, name: string) {
    return new clazz(name);
}
let a: Animal = createClass(Animal, 'zhufeng'); //Animal 修饰类的实例

### 2.class 装饰器执行顺序？

    - 执行顺序的规律
    - 1.类装饰器是最后执行的, 后写的类装饰器先执行
        - 2.方法和就去参数中的装饰器先执行参数
            - 3.  就去和属性装饰器, 谁在前面先执行谁
                -
                - 一般人内往外执行 先内后外
                    - 类比 React 组件的 componentDidMount 先上后下 先内后外
                        - 一定要学会知识的
                        - koa 中间件 redux 中间件
  PropertyDecorator name name
  PropertyDecorator age age
  ParameterDecorator hello 1
  ParameterDecorator hello 0
  MethodDecorator hello
  ClassDecorator2
  ClassDecorator1

 
namespace f {
    function ClassDecorator1(){
        return function(target){
        console.log('ClassDecorator1');
    }
}
function ClassDecorator2() {
        return function (target) {
        console.log('ClassDecorator2');
    }
}
function PropertyDecorator(name:string) {
        return function (target,propertyName) {
        console.log('PropertyDecorator', propertyName, name);
    }
}
function MethodDecorator() {
        return function (target, propertyName) {
        console.log('MethodDecorator', propertyName);
    }
}
function ParameterDecorator() {
        return function (target, methodName,index) {
        console.log('ParameterDecorator', methodName, index);
    }
}
@ClassDecorator1()
@ClassDecorator2()  
 class Person{
    @PropertyDecorator('name')
    name:string = '';
    @PropertyDecorator('age')
    age:number=10;
    @MethodDecorator()
    hello(@ParameterDecorator() p1:string, @ParameterDecorator() p2:string){}
}



### 3.简述工具类型 Exclude、Omit、Merge、Intersection、Overwrite 的作用

## Partial 批量把一个接口中的属性全部变成可选的


interface Person6{
    name:string;
    age:number;
    gender:'male'|'female'
}
type Partial<T> = {
    [key in keyof T]?: T[key]
}
type PPerson = Partial<Person6>

## Required 批量把一个接口中的属性全部变成必选的

type Required<T> = {
    [key in keyof T]-?: T[key]
}

## Pick


let person:Person = {name:'zhufeng',age:11,gender:1};
type KeyOfPerson = keyof Person;// 'name'|'age'|'gender'
type Pick<T, K extends keyof T> = {
[P in K]: T[P];
};
type PickPerson = Pick<Person,'name'|'age'>;




## Exclude < T, U > 从 T 中排除出可分配给 U 的元素。

type Exclude<T, U> = T extends U ? never : T;
type R4 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>; //d

## Extract 从 T 中选取也在 U 中的元素。

type Extract<T, U> = T extends U ? T : never;
//string|number
//有条件类型分发
type E = Extract<string | number | boolean, string | number>; //string | number
let e: E = '1';

## Omit < T, K > 的作用是忽略 T 中的某些属性。

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Props = { name: string, age: number, visible: boolean };
type OmitAgeProps = Omit<Props, 'age'>;

## Diff T中选择不在U中的属性

type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

## Intersection < T, U > 的作用是取 T 的属性, 此属性同样也存在与 U。 交叉属性

type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;
type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };
type InterProps = Props & DefaultProps;
const int: InterProps = { name: '1', age: 1, visible: true }
type DuplicateProps = InterSection<Props, DefaultProps>;
// (type DuplicateProps = {age: number;})

## Overwrite < T, U > 是用 U 中和 T 相同的属性覆盖 T 的相同属性。

type Overwrite<
    T extends object,
    U extends object,
    // {name: string,visible: boolean } & {age:string} {name: string,visible: boolean,age:string }
    I = Diff<T, U> & InterSection<U, T>> = Pick<I, keyof I>

type OldProps = { name: string, age: number, visible: boolean };
type NewProps = { age: string, other: string };

type ReplacedProps = Overwrite<OldProps, NewProps>; //name，age：string，visible

## Compute < A & B > 是将交叉类型合并

type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] }
type R1 = Compute<{ x: 'x' } & { y: 'y' }>;//{x:'x',y:'y'}

## Merge < O1, O2 > 是将两个对象的属性合并。

type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>
type O1 = {
    id: number;
    name: string
}
type O2 = {
    id: string;
    age: number;
}
type R2 = Merge<O1, O2>; //{id:number,name:string,age:number}
