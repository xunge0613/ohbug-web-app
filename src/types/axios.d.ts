interface Data {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
}

// eslint-disable-next-line
import axios from 'axios';
declare module 'axios' {
  export interface AxiosInstance {
    request<T = Data>(config: AxiosRequestConfig): Promise<T>;
    get<T = Data>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = Data>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = Data>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = Data>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = Data>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = Data>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}
