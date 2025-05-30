import apiFetcher from '@/lib/apiFetcher';
import axiosFetcher from '@/lib/axiosFetcher';
import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { ApiResponse } from '@/types/api';
import { KakaoLoginResponse, TokenRefreshResponse } from '@/types/auth';

export const authApi = {
  loginWithKakaoCode: async (code: string) => {
    return await axiosFetcher.get<KakaoLoginResponse>(
      '/api/v1/auth/callback/kakao',
      { params: { code } }
    );
  },

  refreshToken: async () => {
    const res =
      await axiosFetcher.post<TokenRefreshResponse>('/api/v1/auth/token');

    if (res.data.data) {
      callTokenUpdater(res.data.data.accessToken);
    }
    return res;
  },

  logout: async () => {
    const res = await apiFetcher.post<ApiResponse>('/api/v1/auth/logout');
    return res;
  },
};
