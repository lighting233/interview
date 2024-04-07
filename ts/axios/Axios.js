"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosInterceptorManager_1 = __importDefault(require("./AxiosInterceptorManager"));
const qs_1 = __importDefault(require("qs"));
const parse_headers_1 = __importDefault(require("parse-headers"));
class Axios {
    constructor() {
        this.interceptor = {
            request: new AxiosInterceptorManager_1.default(),
            response: new AxiosInterceptorManager_1.default()
        };
    }
    request(config) {
        // return this.dispatchRequest(config)
        const chain = [
            { onFulifilled: this.dispatchRequest }
        ];
        this.interceptor.request.interceptors.forEach((interceptor) => {
            interceptor && chain.unshift(interceptor);
        });
        this.interceptor.response.interceptors.forEach((interceptor) => {
            interceptor && chain.push(interceptor);
        });
        let promise = Promise.resolve(config);
        while (chain.length) {
            const { onFulifilled, onRejected } = chain.shift();
            promise = promise.then(onFulifilled, onRejected);
        }
        return promise;
    }
    dispatchRequest(config) {
        return new Promise((resolve, reject) => {
            let { method, url, params, headers, data, timeout } = config;
            let request = new XMLHttpRequest();
            if (params) {
                params = qs_1.default.stringify(params);
                url += (url.indexOf('?') == -1 ? '?' : '&') + params;
            }
            request.open(method, url, true);
            request.responseType = 'json';
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300 && request.status !== 0) {
                        let response = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: (0, parse_headers_1.default)(request.getAllResponseHeaders()),
                            config,
                            request
                        };
                        resolve(response);
                    }
                    else {
                        reject(`请求失败 ${request.status}`);
                    }
                }
            };
            if (headers) {
                for (let key in headers) {
                    request.setRequestHeader(key, headers[key]);
                }
            }
            let body = null;
            if (data) {
                body = JSON.stringify(data);
            }
            request.onerror = function () {
                reject('net::err');
            };
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = function () {
                    reject('timeout');
                };
            }
            request.send(body);
        });
    }
}
exports.default = Axios;
