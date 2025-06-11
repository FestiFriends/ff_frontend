import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { KakaoLoginResponse } from '@/types/auth';

export const authApi = {
  loginWithKakaoCode: async (code: string) => {
    const isDev = process.env.NODE_ENV === 'development';
    const basePath = isDev
      ? '/api/v1/auth/dev/callback/kakao'
      : '/api/v1/auth/callback/kakao';

    return await apiFetcher.get<KakaoLoginResponse>(basePath, {
      params: { code },
    });
  },

  logout: async () => {
    const res = await apiFetcher.post<ApiResponse>('/api/v1/auth/logout');
    return res;
  },
};
