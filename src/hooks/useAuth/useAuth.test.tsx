import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { SseStoreProvider } from '@/providers/SseStoreProvider';
import { authApi } from '@/services/authService';
import { useKakaoLogin, useLogin, useLogout } from './useAuth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/some-path'),
}));

jest.mock('../../providers/AuthStoreProvider', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('../../services/authService', () => ({
  authApi: {
    loginWithKakaoCode: jest.fn(),
    logout: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <SseStoreProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SseStoreProvider>
  );

  return Wrapper;
};

describe('인증 관련 훅 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useLogin 훅', () => {
    test('카카오 로그인 URL로 리다이렉트 해야 한다', () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });

      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.onLogin();
      });

      expect(push).toHaveBeenCalled();
      expect(push.mock.calls[0][0]).toContain(
        'kauth.kakao.com/oauth/authorize'
      );
    });

    test('현재 경로를 가져와 kakaoAuthUrl에 포함해야 한다', () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });
      (usePathname as jest.Mock).mockReturnValue('/previous-page');

      const { result } = renderHook(() => useLogin());

      act(() => {
        result.current.onLogin();
      });

      expect(push).toHaveBeenCalled();

      const calledUrl = push.mock.calls[0][0];
      expect(calledUrl).toContain('kauth.kakao.com/oauth/authorize');
      expect(calledUrl).toContain(encodeURIComponent('/previous-page'));
    });
  });

  describe('useKakaoLogin 훅', () => {
    test('로그인 성공 시 로그인 함수 호출 및 직전 페이지 리다이렉트', async () => {
      const login = jest.fn();
      const push = jest.fn();

      (useAuthStore as jest.Mock).mockImplementation((selector) =>
        selector({ login })
      );

      (useRouter as jest.Mock).mockReturnValue({ push });

      (authApi.loginWithKakaoCode as jest.Mock).mockResolvedValue({
        data: {
          data: { accessToken: 'accessToken' },
        },
      });

      const { result } = renderHook(() => useKakaoLogin('/previous-page'), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        await result.current.mutateAsync('code');
      });

      expect(login).toHaveBeenCalledWith('accessToken');
      expect(push).toHaveBeenCalledWith('/previous-page');
    });

    test('로그인 실패 시 알림창 표시 및 직전 페이지 리다이렉트', async () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });

      global.alert = jest.fn();

      (authApi.loginWithKakaoCode as jest.Mock).mockRejectedValue(
        new Error('로그인에 실패했습니다.')
      );

      const { result } = renderHook(() => useKakaoLogin('/previous-page'), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        try {
          await result.current.mutateAsync('code');
        } catch {
          //
        }
      });

      expect(global.alert).toHaveBeenCalledWith('로그인에 실패했습니다.');

      expect(push).toHaveBeenCalledWith('/previous-page');
    });

    test('로그인 실패 시 error.message가 없으면 기본 메시지로 alert 호출', async () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });

      global.alert = jest.fn();

      (authApi.loginWithKakaoCode as jest.Mock).mockRejectedValue({});

      const { result } = renderHook(() => useKakaoLogin('/previous-page'), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        try {
          await result.current.mutateAsync('code');
        } catch {
          //
        }
      });

      expect(global.alert).toHaveBeenCalledWith(
        '로그인 중 문제가 발생했습니다.'
      );

      expect(push).toHaveBeenCalledWith('/previous-page');
    });
  });

  describe('useLogout 훅', () => {
    test('로그아웃 성공 시 로그아웃 함수 호출 및 홈으로 이동', async () => {
      const logout = jest.fn();
      const push = jest.fn();
      (useAuthStore as jest.Mock).mockImplementation((selector) =>
        selector({ logout })
      );
      (useRouter as jest.Mock).mockReturnValue({ push });

      (authApi.logout as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        await result.current.mutateAsync();
      });

      expect(logout).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith('/');
    });

    test('로그아웃 실패 시 알림창 표시 및 홈으로 이동', async () => {
      const push = jest.fn();
      global.alert = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });

      (authApi.logout as jest.Mock).mockRejectedValue(
        new Error('로그아웃에 실패했습니다.')
      );

      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        try {
          await result.current.mutateAsync();
        } catch {
          //
        }
      });

      expect(global.alert).toHaveBeenCalledWith('로그아웃에 실패했습니다.');
      expect(push).toHaveBeenCalledWith('/');
    });

    test('로그아웃 실패 시 알림창 표시 및 홈으로 이동', async () => {
      const push = jest.fn();
      global.alert = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push });

      (authApi.logout as jest.Mock).mockRejectedValue({});

      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        try {
          await result.current.mutateAsync();
        } catch {
          //
        }
      });

      expect(global.alert).toHaveBeenCalledWith(
        '로그아웃 중 문제가 발생했습니다.'
      );
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
