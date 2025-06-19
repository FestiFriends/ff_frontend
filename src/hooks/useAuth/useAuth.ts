import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { useSseStore } from '@/providers/SseStoreProvider';
import { authApi } from '@/services/authService';
import { ApiResponse } from '@/types/api';

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
      const resData = res.data;
      if (resData.data) {
        login(resData.data.accessToken);
        router.push(
          resData.data.isNewUser ? '/profiles/me/edit' : redirectPath
        );
      }
    },
    onError: (error: ApiResponse) => {
      alert(error.message ?? '로그인 중 문제가 발생했습니다.');
      router.push(redirectPath);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const disconnect = useSseStore((state) => state.disconnect);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      disconnect();
      router.push('/');
    },
    onError: (error: ApiResponse) => {
      alert(error.message ?? '로그아웃 중 문제가 발생했습니다.');
      router.push('/');
    },
  });
};

export const useWithdraw = () => {
  const logout = useAuthStore((state) => state.logout);
  const disconnect = useSseStore((state) => state.disconnect);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.withdraw,
    onSuccess: () => {
      logout();
      disconnect();
      router.replace('/');
    },
    onError: (error) => {
      alert(error.message ?? '회원 탈퇴 중 오류가 발생했습니다.');
    },
  });
};
