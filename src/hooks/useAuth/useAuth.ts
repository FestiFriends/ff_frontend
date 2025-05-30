import { useAuthStore } from '@/providers/AuthStoreProvider';
import { authApi } from '@/services/authService';
import { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

export const useLogin = () => {
  const pathname = usePathname();

  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;
  const state = encodeURIComponent(pathname);
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${state}`;

  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push(kakaoAuthUrl);
  };

  return { onLogin: handleKakaoLogin };
};

export const useKakaoLogin = (redirectPath: string) => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.loginWithKakaoCode,
    onSuccess: (res) => {
      if (res.data) {
        login(res.data.accessToken);
      }
      router.push(redirectPath);
    },
    onError: (error: ApiResponse) => {
      alert(error.message ?? '로그인 중 문제가 발생했습니다.');
      router.push(redirectPath);
    },
  });
};
