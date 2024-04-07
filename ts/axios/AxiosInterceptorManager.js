"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export interface AxiosInterceptorManager<V> {
//     use(onFulifilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
//     eject(id:number): void;
// }
class AxiosInterceptorManager {
    constructor() {
        this.interceptors = [];
    }
    use(onFulifilled, onRejected) {
        this.interceptors.push({
            onFulifilled,
            onRejected
        });
        return this.interceptors.length - 1;
    }
    eject(id) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}
exports.default = AxiosInterceptorManager;
