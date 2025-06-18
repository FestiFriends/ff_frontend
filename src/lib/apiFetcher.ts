import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { callLogout } from '@/providers/AuthStoreProvider';
import { ApiResponse } from '@/types/api';
import { getNewAccessToken } from '@/utils/getNewAccessToken';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

const request = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
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

instance.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 + 재시도 안한 요청이면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    if (error.response?.status === 403) {
      callLogout();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data as ApiResponse;
  }

  return {
    code: -1,
    message:
      error instanceof Error
        ? error.message
        : '알 수 없는 에러가 발생하였습니다.',
  };
};

export const getAccessToken = (): string | null => {
  const authInfo = localStorage.getItem('authInfo');
  if (!authInfo) return null;
  return JSON.parse(authInfo).state.accessToken;
};

const apiFetcher = {
  get: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'GET' }),

  delete: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'DELETE' }),

  post: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'POST', data }),

  put: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'PUT', data }),

  patch: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => request<T, R, D>(url, { ...config, method: 'PATCH', data }),
};

export default apiFetcher;
