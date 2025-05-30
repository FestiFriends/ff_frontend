import { handleApiError } from '@/lib/api';
import { KakaoLoginResponse } from '@/types/auth';
import axios from 'axios';

export const authApi = {
  loginWithKakaoCode: async (code: string) => {
    try {
      const response = await axios.get<KakaoLoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/callback/kakao`,
        {
          params: { code },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
