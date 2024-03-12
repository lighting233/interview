interface Person {
    age: number;
    name: string;
    sex: string;
}

type MyPartial<T> = {
    [key in keyof T]?: T[key]
}

type Tom = Partial<Person>

interface Company {
    id: number;
    name: string;
}
interface Person {
    id: number;
    name: string;
    company: Company
}
//递归
type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}
type PartialPerson = DeepPartial<Person>;
let p: PartialPerson = {
    id: 1,
    name: 'zhufeng',
    company: {}
}
type Required<T> = {
    [P in keyof T]-?: T[P];
};
type RequiredTom = Required<Person>

namespace namespaceB {
    interface Person {
        name: string;
        age: number;
    }
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };
    type ReadOnlyAgePerson = Partial<Person> & { readonly age: Person['age'] };
    let p: ReadOnlyAgePerson = {
        name: 'zhufeng',
        age: 11
    }
    p.name = 'jiagou';
    // p.age = 11;
}

type PickTom = Pick<Tom, 'age' | 'name'>

type myPick<T, k extends keyof T> = {
    [p in k]: T[k]
}

type OmitTom = Omit<Tom, 'age' | 'name'>

// type MyOmit<T,k extends keyof any> = Pick<T, Exclude<keyof T, k>>
//忽略
type MyOmit<T, k extends keyof any> = {
    [p in Exclude<keyof T, k>]: T[p]
}

type SelectTinU = Extract<'a' | 'b' | 'c', 'a'>

type MyExtract<T, U> = T extends U ? T : never;

type SelectTuninU = Exclude<'a' | 'b' | 'c', 'a'>

type NyExclude<T, U> = T extends U ? never : T;
type diffa = {
    name: string,
    age: number,
}
type diffb = {
    age: number,
    sex: boolean
}
type diffc = Diff<diffa, diffb>
type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>

// type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>

type InterSection<T, U> = {
    [K in keyof T & keyof U]: T[K]
}
type Test = ('a' | 'b') & ('a' | 'c')
type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };
type DuplicateProps = InterSection<Props, DefaultProps>;

type Overwrite<T extends object, U extends object, I = Diff<T, U> & InterSection<U, T>> = Pick<I, keyof I>

type Compute<A extends any> = A extends Function ? A : {
    [k in keyof A]: A[k]
}
type O1 = {
    id: number;
    name: string
}
type O2 = {
    id: string;
    age: number;
}
type R1 = Compute<O1 & O2>;
type K1 = keyof O1 & O2

type R2<T extends object, U extends object, I = U & T> = Pick<I, keyof I>
type R3 = R2<O1, O2>
type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>




//内置条件类型
//Exclude 排除
type Exclude<T, U> = T extends U ? never : T;
type R4 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>;

//Extract 提取
type Extract<T, U> = T extends U ? T : never;
type R5 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>;

//NonNullable 剔除null和undefined
type NonNullable<T> = T extends null | undefined ? never : T;
type R6 = NonNullable<'a' | null | undefined>;

//ReturnType infer推断的意思
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
function getUser(a: string, b: number) {
    return { name: 'zhufeng', age: 10 };
}
type GetUserType = typeof getUser;
type ReturnUser = ReturnType<GetUserType>;

// Parameters 参数
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type ParamsType = Parameters<GetUserType>;

//获取类的构造函数的参数类型 ConstructorParameters
class Person8 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    getName() { console.log(this.name); }
}
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
type Params = ConstructorParameters<typeof Person8>;
type ConstructorType = typeof Person8
const conFun: ConstructorType = Person8;
const instanceFun: Person8 = new Person8('123')

//获取实例类型
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
type Person8Instance = InstanceType<typeof Person8>;
let instance: Person8Instance = {
    name: 'zf',
    getName() { }
}

//infer应用案例
//tuple转union
type ElementOf<T> = T extends Array<infer E> ? E : never;
type Ttuple = [string, number, boolean];
type TupleToUnion = ElementOf<Ttuple>;//string|number|boolean // 联合类型

// 参数=>返回值   参数:返回值
type First<T> = T extends { name: infer A } ? A : never;
type K11 = First<{ name: string }>

//联合类型转成交叉类型
//string|number => string&number
type T1 = { name: string };
type T2 = { age: number };
type T4 = T1 | T2;
type T5 = T1 & T2
//U需要同时具有T1，T2两个属性 A extends B 意味着A可以给B赋值，T1 & T2 可以给 U赋值，意味着 U为T1&T2
type ToIntersection<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T3 = ToIntersection<{ a: (x: T1) => void, b: (x: T2) => void }>;
//T1 & T2 交集 交叉类型
let t33: T3 = { name: '', age: 10 };

type ToUnionOfFunction<T> = T extends any ? (x: T) => any : never;
// type Functions = ToUnionOfFunction<{ a: string } | { b: number }> 
type Functions = ((x: { a: string }) => any) | ((x: { b: number }) => any)
// type UnionToIntersection<T> = ToUnionOfFunction<T> extends (x: infer P) => any ? P : never;

type UnionToIntersection<T> =(T extends any ? (x: T) => void : never) extends ((x: infer P) => void) ? P : never;


const t44: T4 = { name: '123' };
const t55: T4 = { age: 123 }

//T5 是 T1 & T2 的结果，表示 T1 和 T2 的交集类型。在 TypeScript 中，交集类型表示一个对象同时具有两个类型的属性。
//现在来看 T1 extends T5 这个条件判断。它的意思是判断类型 T1 是否可以赋值给类型 T5。如果 T1 可以赋值给 T5，则返回 true，否则返回 false。
//由于 T5 是 T1 & T2，它要求对象具有 T1 和 T2 的所有属性。然而，根据代码中的定义，T1 只有 name 属性，而没有 age 属性。因此，T1 并不满足 T5 的要求，所以 T1 extends T5 的结果为 false。
//换句话说，T1 不是一个同时具有 name 和 age 属性的类型，所以它不能赋值给 T5，因此返回 false。
type Tn<T> = T extends T5 ? string : never;
type Tnn = Tn<T1>

