# API Fetcher 통합 문서

본 문서는 Axios 기반 API Fetcher에 대해 설명합니다.  
`apiFetcher`는 액세스 토큰을 자동으로 헤더에 포함하고, 401 Unauthorized 에러 발생 시 토큰 갱신 및 재시도를 처리하는 fetcher 입니다.

## 1. apiFetcher

### 설명

- 요청 시 자동으로 로컬스토리지에서 액세스 토큰을 읽어 토큰이 존재 할 경우 Authorization 헤더에 포함합니다.
- 응답이 401 Unauthorized 이고 최초 재시도 요청이 아닐 때, 토큰 갱신 API를 호출하여 새로운 토큰으로 재시도합니다.
- 토큰 갱신 실패 시 로그아웃 처리 및 카카오 로그인 페이지로 리다이렉트합니다.
- withCredentials: true 옵션 포함.

### 주요 기능

- Request Interceptor: 헤더에 Authorization: Bearer `<accessToken>` 자동 추가
- Response Interceptor: 401 응답 처리 및 토큰 갱신/재시도
- 토큰 갱신 API: POST /api/v1/auth/token (withCredentials:true)
- 로그아웃 처리: 토큰 갱신 실패 시 callLogout() 호출 후 로그인 페이지 이동

### 주요 코드

```ts
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<TokenRefreshResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.data?.accessToken;
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

const request = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
) => {
  try {
    const response = await instance.request<T>({ url, ...config });
    return response as R;
  } catch (error) {
    throw handleApiError(error);
  }
};

const apiFetcher = {
  get: <T, R, D>(url: string, config?: AxiosRequestConfig<D>) =>
    request<T, R, D>(url, { ...config, method: 'GET' }),
  delete: <T, R, D>(url: string, config?: AxiosRequestConfig<D>) =>
    request<T, R, D>(url, { ...config, method: 'DELETE' }),
  post: <T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
    request<T, R, D>(url, { ...config, method: 'POST', data }),
  put: <T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
    request<T, R, D>(url, { ...config, method: 'PUT', data }),
  patch: <T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
    request<T, R, D>(url, { ...config, method: 'PATCH', data }),
};

export default apiFetcher;
```

## 2. 공통 유틸리티

### handleApiError

Axios 요청 실패 시 에러 객체에서 서버 응답 메시지를 추출하거나, 기본 메시지를 반환합니다.

```ts
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
```

## 3. 환경 변수

- NEXT_PUBLIC_BACKEND_URL : 백엔드 API 기본 URL
- NEXT_PUBLIC_BASE_URL : 프론트엔드 앱 기본 URL (리다이렉트용)
- NEXT_PUBLIC_KAKAO_APP_KEY : 카카오 앱 키 (로그인용)

## 4. 참고

- 토큰 갱신 실패 시 카카오 로그인 페이지로 리다이렉트하며, 새로 로그인하도록 유도합니다.
- callLogout(), callTokenUpdater() 함수는 AuthStoreProvider에서 구현한 상태 관리 함수입니다.

## 부록: 예시 호출

```ts
import apiFetcher from '@/fetcher/apiFetcher';

// GET 요청 예시 (토큰 필요)
const res = await apiFetcher.get<User>('/api/v1/user/profile');

// POST 요청 예시 (토큰 필요)
const res = await apiFetcher.post<LoginResponse>('/api/v1/auth/login', {
  username,
  password,
});
```
