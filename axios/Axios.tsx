import { AxiosRequestConfig, AxiosResponse } from './types';
import AxiosInterceptorManager, { Interceptor, OnFulifilled } from './AxiosInterceptorManager'
import qs from 'qs';
import parseHeaders from 'parse-headers'

export default class Axios<T> {
    public interceptor = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        // return this.dispatchRequest(config)
        const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> =[
            { onFulifilled : this.dispatchRequest } 
        ]
        this.interceptor.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
            interceptor && chain.unshift(interceptor)
        });
        this.interceptor.response.interceptors.forEach((interceptor: Interceptor<AxiosResponse<T>> | null) => {
            interceptor && chain.push(interceptor)
        })
        let promise:Promise<AxiosRequestConfig | AxiosResponse<T>> = Promise.resolve(config);
        while (chain.length) {
            const { onFulifilled, onRejected} = chain.shift()!; 
            promise = promise.then(onFulifilled as (value: AxiosRequestConfig | AxiosResponse<T>) => AxiosRequestConfig | Promise<AxiosRequestConfig> | AxiosResponse<T> | Promise<AxiosResponse<T>>, onRejected)
        }
        return promise;
    }

    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            let { method, url, params, headers, data, timeout } = config;
            let request = new XMLHttpRequest();
            if (params) {
                params = qs.stringify(params);
                url += (url!.indexOf('?') == -1 ? '?' : '&') + params;
            }
            
            request.open(method!, url!, true);
            request.responseType = 'json';
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300 && request.status !== 0) {
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        resolve(response)
                    } else {
                        reject(`请求失败 ${request.status}`)
                    }
                }
            }
            if (headers) {
                for (let key in headers) {
                    request.setRequestHeader(key, headers[key])
                }
            }
            let body: string | null = null;
            if (data) {
                body = JSON.stringify(data)
            }
            request.onerror = function () {
                reject('net::err')
            }
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = function () {
                    reject('timeout')
                }
            }
            request.send(body);
        })
    }
}