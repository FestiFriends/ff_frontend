import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { ApiResponse } from '@/types/api';
import { TokenRefreshResponse } from '@/types/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

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
        const res = await axios.post<TokenRefreshResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token`,
          {},
          { withCredentials: true }
        );
        const resData = res.data;
        const newAccessToken = resData.data?.accessToken;
        if (newAccessToken) callTokenUpdater(newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        callLogout();

        const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.open(kakaoAuthUrl, '_self');

        return Promise.reject(refreshErr);
      }
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

export default apiFetcher;
