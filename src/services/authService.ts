import apiFetcher from '@/lib/apiFetcher';
import axiosFetcher from '@/lib/axiosFetcher';
import { ApiResponse } from '@/types/api';
import { KakaoLoginResponse } from '@/types/auth';

export const authApi = {
  loginWithKakaoCode: async (code: string) =>
    await axiosFetcher.get<KakaoLoginResponse>('/api/v1/auth/callback/kakao', {
      params: { code },
    }),

  logout: async () => {
    const res = await apiFetcher.post<ApiResponse>('/api/v1/auth/logout');
    return res;
  },
};
