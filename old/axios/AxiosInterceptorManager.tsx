
export interface OnFulifilled<V> {
    (value: V): V | Promise<V>
}



interface OnRejected {
    (error: any): any;
}

export interface Interceptor<V> {
    onFulifilled?: OnFulifilled<V>;
    onRejected?: OnRejected;
}

// export interface AxiosInterceptorManager<V> {
//     use(onFulifilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
//     eject(id:number): void;
// }

export default class AxiosInterceptorManager<V> {
    public interceptors: Array<Interceptor<V> | null> = [];
    use(onFulifilled?: OnFulifilled<V>, onRejected?: OnRejected): number {
        this.interceptors.push({
            onFulifilled,
            onRejected
        })
        return this.interceptors.length - 1
    }
    eject(id: number) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }

    }
}