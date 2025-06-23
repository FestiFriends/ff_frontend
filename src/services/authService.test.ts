import apiFetcher from '@/lib/apiFetcher';
import { authApi } from '@/services/authService';
import { ApiResponse } from '@/types/api';
import { KakaoLoginResponse } from '@/types/auth';

// Mock apiFetcher
jest.mock('@/lib/apiFetcher');

describe('authApi', () => {
  const mockApiFetcher = apiFetcher as jest.Mocked<typeof apiFetcher>;

  beforeEach(() => {
    jest.clearAllMocks();
    // NODE_ENV를 기본값으로 설정
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginWithKakaoCode', () => {
    const mockKakaoResponse: KakaoLoginResponse = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
    };

    it('development 환경에서 dev 경로로 요청해야 한다', async () => {
      // Arrange
      process.env.NODE_ENV = 'development';
      const code = 'test-kakao-code';
      mockApiFetcher.get.mockResolvedValue(mockKakaoResponse);

      // Act
      const result = await authApi.loginWithKakaoCode(code);

      // Assert
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/dev/callback/kakao',
        {
          params: { code },
        }
      );
      expect(result).toEqual(mockKakaoResponse);
    });

    it('production 환경에서 일반 경로로 요청해야 한다', async () => {
      // Arrange
      process.env.NODE_ENV = 'production';
      const code = 'test-kakao-code';
      mockApiFetcher.get.mockResolvedValue(mockKakaoResponse);

      // Act
      const result = await authApi.loginWithKakaoCode(code);

      // Assert
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/callback/kakao',
        {
          params: { code },
        }
      );
      expect(result).toEqual(mockKakaoResponse);
    });

    it('test 환경에서 일반 경로로 요청해야 한다', async () => {
      // Arrange
      process.env.NODE_ENV = 'test';
      const code = 'test-kakao-code';
      mockApiFetcher.get.mockResolvedValue(mockKakaoResponse);

      // Act
      const result = await authApi.loginWithKakaoCode(code);

      // Assert
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/callback/kakao',
        {
          params: { code },
        }
      );
      expect(result).toEqual(mockKakaoResponse);
    });

    it('카카오 코드가 빈 문자열이어도 요청을 보내야 한다', async () => {
      // Arrange
      const code = '';
      mockApiFetcher.get.mockResolvedValue(mockKakaoResponse);

      // Act
      const result = await authApi.loginWithKakaoCode(code);

      // Assert
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/callback/kakao',
        {
          params: { code: '' },
        }
      );
      expect(result).toEqual(mockKakaoResponse);
    });

    it('API 요청이 실패하면 에러를 전파해야 한다', async () => {
      // Arrange
      const code = 'test-kakao-code';
      const error = new Error('API request failed');
      mockApiFetcher.get.mockRejectedValue(error);

      // Act & Assert
      await expect(authApi.loginWithKakaoCode(code)).rejects.toThrow(
        'API request failed'
      );
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/callback/kakao',
        {
          params: { code },
        }
      );
    });
  });

  describe('logout', () => {
    const mockLogoutResponse: ApiResponse = {
      success: true,
      message: 'Successfully logged out',
    };

    it('로그아웃 API를 올바르게 호출해야 한다', async () => {
      // Arrange
      mockApiFetcher.post.mockResolvedValue(mockLogoutResponse);

      // Act
      const result = await authApi.logout();

      // Assert
      expect(mockApiFetcher.post).toHaveBeenCalledWith('/api/v1/auth/logout');
      expect(result).toEqual(mockLogoutResponse);
    });

    it('로그아웃 API 요청이 실패하면 에러를 전파해야 한다', async () => {
      // Arrange
      const error = new Error('Logout failed');
      mockApiFetcher.post.mockRejectedValue(error);

      // Act & Assert
      await expect(authApi.logout()).rejects.toThrow('Logout failed');
      expect(mockApiFetcher.post).toHaveBeenCalledWith('/api/v1/auth/logout');
    });

    it('로그아웃 응답이 실패 상태여도 결과를 반환해야 한다', async () => {
      // Arrange
      const failureResponse: ApiResponse = {
        success: false,
        message: 'Already logged out',
      };
      mockApiFetcher.post.mockResolvedValue(failureResponse);

      // Act
      const result = await authApi.logout();

      // Assert
      expect(mockApiFetcher.post).toHaveBeenCalledWith('/api/v1/auth/logout');
      expect(result).toEqual(failureResponse);
    });
  });

  describe('withdraw', () => {
    const mockWithdrawResponse: ApiResponse = {
      success: true,
      message: 'Account successfully deleted',
    };

    it('회원탈퇴 API를 올바르게 호출해야 한다', async () => {
      // Arrange
      mockApiFetcher.delete.mockResolvedValue(mockWithdrawResponse);

      // Act
      const result = await authApi.withdraw();

      // Assert
      expect(mockApiFetcher.delete).toHaveBeenCalledWith('/api/v1/users/me');
      expect(result).toEqual(mockWithdrawResponse);
    });

    it('회원탈퇴 API 요청이 실패하면 에러를 전파해야 한다', async () => {
      // Arrange
      const error = new Error('Withdrawal failed');
      mockApiFetcher.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(authApi.withdraw()).rejects.toThrow('Withdrawal failed');
      expect(mockApiFetcher.delete).toHaveBeenCalledWith('/api/v1/users/me');
    });

    it('회원탈퇴 응답이 실패 상태여도 결과를 반환해야 한다', async () => {
      // Arrange
      const failureResponse: ApiResponse = {
        success: false,
        message: 'Account deletion failed',
      };
      mockApiFetcher.delete.mockResolvedValue(failureResponse);

      // Act
      const result = await authApi.withdraw();

      // Assert
      expect(mockApiFetcher.delete).toHaveBeenCalledWith('/api/v1/users/me');
      expect(result).toEqual(failureResponse);
    });
  });

  describe('환경 변수 테스트', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('NODE_ENV가 undefined일 때 일반 경로를 사용해야 한다', async () => {
      // Arrange
      delete process.env.NODE_ENV;
      const code = 'test-code';
      const mockResponse: KakaoLoginResponse = {
        accessToken: 'token',
        refreshToken: 'refresh',
        user: { id: '1', email: 'test@test.com', name: 'Test' },
      };
      mockApiFetcher.get.mockResolvedValue(mockResponse);

      // Act
      await authApi.loginWithKakaoCode(code);

      // Assert
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/callback/kakao',
        { params: { code } }
      );
    });

    it('NODE_ENV가 빈 문자열일 때 일반 경로를 사용해야 한다', async () => {
      // Arrange
      process.env.NODE_ENV = '';
      const code = 'test-code';
      const mockResponse: KakaoLoginResponse = {
        accessToken: 'token',
        refreshToken: 'refresh',
        user: { id: '1', email: 'test@test.com', name: 'Test' },
      };
      mockApiFetcher.get.mockResolvedValue(mockResponse);

      // Act
      await authApi.loginWithKakaoCode(code);

      // Assert
      expect(mockApiFetcher.get).toHaveBeenCalledWith(
        '/api/v1/auth/callback/kakao',
        { params: { code } }
      );
    });
  });
});
