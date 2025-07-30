import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";

// request 方法 opts 参数的接口
interface IRequestOptions extends AxiosRequestConfig {
  [key: string]: any;
}

interface IRequestOptionsWithResponse extends IRequestOptions {
  getResponse: true;
}

interface IRequestOptionsWithoutResponse extends IRequestOptions {
  getResponse: false;
}

interface IRequest {
  <T = any>(url: string, opts: IRequestOptionsWithResponse): Promise<T>;
  <T = any>(url: string, opts: IRequestOptionsWithoutResponse): Promise<T>;
  <T = any>(url: string, opts: IRequestOptions): Promise<T>; // getResponse 默认是 false， 因此不提供该参数时，只返回 data
  <T = any>(url: string): Promise<T>; // 不提供 opts 时，默认使用 'GET' method，并且默认返回 data
}

type RequestError = AxiosError | Error;

interface IErrorHandler {
  (error: RequestError, opts: IRequestOptions): void;
}
type WithPromise<T> = T | Promise<T>;
type IRequestInterceptorAxios = (
  config: IRequestOptions
) => WithPromise<IRequestOptions>;
type IRequestInterceptorUmiRequest = (
  url: string,
  config: IRequestOptions
) => WithPromise<{ url: string; options: IRequestOptions }>;
type IRequestInterceptor =
  | IRequestInterceptorAxios
  | IRequestInterceptorUmiRequest;
type IErrorInterceptor = (error: Error) => Promise<Error>;
type IResponseInterceptor = <T = any>(
  response: AxiosResponse<T>
) => WithPromise<AxiosResponse<T>>;

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  errorConfig?: {
    errorHandler?: IErrorHandler;
    errorThrower?: (res: T) => void;
  };
}

let requestInstance: AxiosInstance;
let config: RequestConfig;
const getConfig = (): RequestConfig => {
  if (config) return config;
  config = {
    url: "/",
  };
  return config;
};

const getRequestInstance = (): AxiosInstance => {
  if (requestInstance) return requestInstance;
  const config = getConfig();
  requestInstance = axios.create(config);

  // 当响应的数据 success 是 false 的时候，抛出 error 以供 errorHandler 处理。
  requestInstance.interceptors.response.use((response) => {
    const { data } = response;
    if (data?.success === false && config?.errorConfig?.errorThrower) {
      config.errorConfig.errorThrower(data);
    }
    return response;
  });
  return requestInstance;
};

const request: IRequest = (url: string, opts: any = { method: "GET" }) => {
  const requestInstance = getRequestInstance();
  const config = getConfig();

  return new Promise((resolve, reject) => {
    requestInstance
      .request({ ...opts, url })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        try {
          const handler = config?.errorConfig?.errorHandler;
          if (handler) handler(error, opts);
        } catch (e) {
          reject(e);
        }
        reject(error);
      });
  });
};

export { request, getRequestInstance };

export type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  RequestError,
  IRequestInterceptorAxios as RequestInterceptorAxios,
  IRequestInterceptorUmiRequest as RequestInterceptorUmiRequest,
  IRequestInterceptor as RequestInterceptor,
  IErrorInterceptor as ErrorInterceptor,
  IResponseInterceptor as ResponseInterceptor,
  IRequestOptions as RequestOptions,
  IRequest as Request,
};
