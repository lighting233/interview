import { AxiosRequestConfig, AxiosResponse } from './types';
import AxiosInterceptorManager from './AxiosInterceptorManager';
export default class Axios<T> {
    interceptor: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<T>>;
    };
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>>;
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>>;
}
