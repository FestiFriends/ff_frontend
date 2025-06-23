import axios from 'axios';
import { getNewAccessToken } from './getNewAccessToken';
import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { TokenRefreshResponse } from '@/types/auth';

// Mock dependencies
jest.mock('axios');
jest.mock('@/providers/AuthStoreProvider', () => ({
  callLogout: jest.fn(),
  callTokenUpdater: jest.fn(),
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn(),
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedCallLogout = callLogout as jest.MockedFunction<typeof callLogout>;
const mockedCallTokenUpdater = callTokenUpdater as jest.MockedFunction<typeof callTokenUpdater>;
const mockedWindowOpen = window.open as jest.MockedFunction<typeof window.open>;

describe('getNewAccessToken', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock environment variables
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_BACKEND_URL: 'https://api.example.com',
      NEXT_PUBLIC_BASE_URL: 'https://example.com',
      NEXT_PUBLIC_KAKAO_APP_KEY: 'test-kakao-key',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('successful token refresh', () => {
    it('should return new access token on successful refresh', async () => {
      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'success',
          message: 'Token refreshed',
          data: {
            accessToken: 'new-access-token-123',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await getNewAccessToken();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/api/v1/auth/token',
        {},
        { withCredentials: true }
      );
      expect(mockedCallTokenUpdater).toHaveBeenCalledWith('new-access-token-123');
      expect(result).toBe('new-access-token-123');
      expect(mockedCallLogout).not.toHaveBeenCalled();
      expect(mockedWindowOpen).not.toHaveBeenCalled();
    });

    it('should call token updater with correct token', async () => {
      const mockToken = 'test-token-456';
      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'success',
          message: 'Token refreshed',
          data: {
            accessToken: mockToken,
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await getNewAccessToken();

      expect(mockedCallTokenUpdater).toHaveBeenCalledWith(mockToken);
      expect(mockedCallTokenUpdater).toHaveBeenCalledTimes(1);
    });
  });

  describe('token refresh failures', () => {
    it('should handle response without access token', async () => {
      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'error',
          message: 'No token',
          data: undefined,
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await expect(getNewAccessToken()).rejects.toThrow('토큰이 존재하지 않습니다.');

      expect(mockedCallLogout).toHaveBeenCalled();
      expect(mockedWindowOpen).toHaveBeenCalledWith(
        'https://kauth.kakao.com/oauth/authorize?client_id=test-kakao-key&redirect_uri=https://example.com/login/kakao&response_type=code',
        '_self'
      );
    });

    it('should handle response with null access token', async () => {
      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'success',
          message: 'Token refreshed',
          data: {
            accessToken: null as any,
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await expect(getNewAccessToken()).rejects.toThrow('토큰이 존재하지 않습니다.');
    });

    it('should handle network error', async () => {
      const networkError = new Error('Network Error');
      mockedAxios.post.mockRejectedValueOnce(networkError);

      await expect(getNewAccessToken()).rejects.toThrow('Network Error');

      expect(mockedCallLogout).toHaveBeenCalled();
      expect(mockedWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('kauth.kakao.com'),
        '_self'
      );
    });

    it('should handle 401 unauthorized error', async () => {
      const unauthorizedError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(unauthorizedError);

      await expect(getNewAccessToken()).rejects.toEqual(unauthorizedError);

      expect(mockedCallLogout).toHaveBeenCalled();
      expect(mockedWindowOpen).toHaveBeenCalled();
    });

    it('should call logout and redirect on any error', async () => {
      const error = new Error('Some error');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(getNewAccessToken()).rejects.toThrow('Some error');

      expect(mockedCallLogout).toHaveBeenCalledTimes(1);
      expect(mockedWindowOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('environment variables', () => {
    it('should use correct API endpoint from environment', async () => {
      process.env.NEXT_PUBLIC_BACKEND_URL = 'https://custom-api.com';

      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'success',
          message: 'Token refreshed',
          data: {
            accessToken: 'token',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await getNewAccessToken();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://custom-api.com/api/v1/auth/token',
        {},
        { withCredentials: true }
      );
    });

    it('should construct correct Kakao auth URL on error', async () => {
      process.env.NEXT_PUBLIC_BASE_URL = 'https://custom-frontend.com';
      process.env.NEXT_PUBLIC_KAKAO_APP_KEY = 'custom-kakao-key';

      const error = new Error('Token refresh failed');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(getNewAccessToken()).rejects.toThrow();

      const expectedUrl = 'https://kauth.kakao.com/oauth/authorize?client_id=custom-kakao-key&redirect_uri=https://custom-frontend.com/login/kakao&response_type=code';
      expect(mockedWindowOpen).toHaveBeenCalledWith(expectedUrl, '_self');
    });
  });

  describe('request configuration', () => {
    it('should include withCredentials in request config', async () => {
      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'success',
          message: 'Token refreshed',
          data: {
            accessToken: 'token',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await getNewAccessToken();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        {},
        { withCredentials: true }
      );
    });

    it('should send POST request with empty body', async () => {
      const mockResponse: { data: TokenRefreshResponse } = {
        data: {
          status: 'success',
          message: 'Token refreshed',
          data: {
            accessToken: 'token',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await getNewAccessToken();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        {},
        expect.any(Object)
      );
    });
  });
});