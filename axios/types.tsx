
export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'options' | 'OPTIONS'

export interface AxiosRequestConfig {
    url?: string;
    method?: Methods;
    params?: Record<string, any> | string;
    headers?: Record<string, any>;
    data?: Record<string, any>;
}

export interface AxiosInstance {
    <T>(config: AxiosRequestConfig): Promise<T>
}

export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers?: Record<string, any>;
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest;
}