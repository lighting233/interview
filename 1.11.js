Argument of type 'OnFulifilled<AxiosRequestConfig> | OnFulifilled<AxiosResponse<T>> | undefined' is not assignable to parameter of type '((value: AxiosRequestConfig | AxiosResponse<T>) => AxiosRequestConfig | PromiseLike<AxiosRequestConfig>) | null | undefined'.
  Type 'OnFulifilled<AxiosRequestConfig>' is not assignable to type '(value: AxiosRequestConfig | AxiosResponse<T>) => AxiosRequestConfig | PromiseLike<AxiosRequestConfig>'.
    Types of parameters 'value' and 'value' are incompatible.
      Type 'AxiosRequestConfig | AxiosResponse<T>' is not assignable to type 'AxiosRequestConfig'.
        Type 'AxiosResponse<T>' is not assignable to type 'AxiosRequestConfig'.
          Types of property 'data' are incompatible.
            Type 'T' is not assignable to type 'Record<string, any> | undefined'.ts(2345)
Axios.tsx(6, 28): This type parameter might need an `extends Record<string, any> | undefined` constraint.