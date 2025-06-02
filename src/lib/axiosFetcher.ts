import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleApiError } from './apiFetcher';

const baseConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
};

const instance = axios.create(baseConfig);

const request = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
) => {
  try {
    const response = await instance.request<T>({
      url,
      ...config,
    });
    return response as R;
  } catch (error) {
    throw handleApiError(error);
  }
};

const axiosFetcher = {
  get: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'GET' }),

  delete: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'DELETE' }),

  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'POST', data }),

  put: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'PUT', data }),

  patch: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'PATCH', data }),
};

export default axiosFetcher;
