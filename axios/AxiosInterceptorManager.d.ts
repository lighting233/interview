export interface OnFulifilled<V> {
    (value: V): V | Promise<V>;
}
interface OnRejected {
    (error: any): any;
}
export interface Interceptor<V> {
    onFulifilled?: OnFulifilled<V>;
    onRejected?: OnRejected;
}
export default class AxiosInterceptorManager<V> {
    interceptors: Array<Interceptor<V> | null>;
    use(onFulifilled?: OnFulifilled<V>, onRejected?: OnRejected): number;
    eject(id: number): void;
}
export {};
