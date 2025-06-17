import axios from 'axios';
import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { TokenRefreshResponse } from '@/types/auth';

export const getNewAccessToken = async (): Promise<string> => {
  try {
    const res = await axios.post<TokenRefreshResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = res.data.data?.accessToken;

    if (!newAccessToken) {
      throw new Error('토큰이 존재하지 않습니다.');
    }

    callTokenUpdater(newAccessToken);
    return newAccessToken;
  } catch (err) {
    callLogout();

    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.open(kakaoAuthUrl, '_self');

    return Promise.reject(err);
  }
};
