interface Data {
  data?: any;
  code: number;
  message: string;
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
