interface Person {
    age: number;
    name: string;
    sex: string;
}

type MyPartial<T> = {
    [key in keyof T]?: T[key]
}

type Tom = Partial<Person>

type RequiredTom = Required<Person>

type PickTom = Pick<Tom,'age'|'name'>

type myPick<T, k extends keyof T> = {
    [p in k]: T[k]
}

type OmitTom = Omit<Tom,'age'|'name'>

// type MyOmit<T,k extends keyof any> = Pick<T, Exclude<keyof T, k>>

type MyOmit<T,k extends keyof any> = {
    [p in Exclude<keyof T, k>]: T[p]
}

type SelectTinU = Extract<'a'|'b'|'c','a'>

type MyExtract<T,U> = T extends U ? T : never;

type SelectTuninU = Exclude<'a'|'b'|'c','a'>

type NyExclude<T, U> = T extends U ? never : T;

type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>

// type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>

type InterSection<T,U> = {
    [K in keyof T & keyof U]: T[K]
}
type Test = ('a'|'b') & ('a'|'c')
type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };
type DuplicateProps = InterSection<Props, DefaultProps>;

type Overwrite<T extends object, U extends object, I = Diff<T,U> & InterSection<U,T>> = Pick<I, keyof I>

type Compute<A extends any> = A extends Function ? A : {
    [k in keyof A]: A[k]
}

type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>