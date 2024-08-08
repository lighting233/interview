export { }
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

let wc: WithNameClass = Animal //描述类， typeof Animal 获取的是类的构造函数
function createClass(clazz: typeof Animal, name: string) {
    return new clazz(name);
}
let a: Animal = createClass(Animal, 'zhufeng'); //Animal 修饰类的实例

function create<T>(c: { new(): T }): T {
    return new c();
}

const user = {
    profile: {
        name: null,
        age: 25
    }
};

const name = user.profile.name ?? 'Anonymous';
const age = user.profile.age ?? 18;

console.log(name); // "Anonymous" (因为 user.profile.name 是 null)
console.log(age); // 2


type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends object ? DeepPartial<T[P]> : T[P];
}

type Pick<T,K extends keyof T> = {
    [P in K]: T[P]
}

type Exculd<T,U> = T extends U ? never : T;
type Omit<T, k extends keyof any> = {
    [p in Exculd<keyof T, k>]: T[p]
}
type Extract<T,U> = T extends U ? T : never;

type Diff<T extends object, U extends object> = Pick<T,Exculd<keyof T, keyof U>>

type InterSection<T extends object, U extends object> ={
    [p in keyof T & keyof U]: T[p]
}

type ReturnType<T> = T extends (...args:any[]) => infer R ? R : never

type Overwrite<T extends object, U extends object, I = Diff<T,U> & InterSection<U,T>> = Pick<I, keyof I> 

type Compute<A extends any> = A extends Function ? A : {[p in keyof A]:A[p]}

type Merge<T extends object, U extends object> = Compute<T & Omit<U, keyof T>>

type O1 = {
    id: number;
    name: string
}
type O2 = {
    id: string;
    age: number;
}
type R2 = Merge<O1, O2>;

