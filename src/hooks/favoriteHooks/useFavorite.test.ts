import { favoritePerformancesOptions, favoriteUsersOptions } from './useFavorite';
import { performancesApi } from '@/services/performancesService';
import { usersApi } from '@/services/usersService';
import { PERFORMANCES_QUERY_KEYS, USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { GetFavoritePerformancesResponse } from '@/types/performance';
import { GetFavoriteUsersResponse } from '@/types/users';

// Mock the services
jest.mock('@/services/performancesService', () => ({
  performancesApi: {
    getFavoritePerformances: jest.fn(),
  },
}));

jest.mock('@/services/usersService', () => ({
  usersApi: {
    getFavoriteUsers: jest.fn(),
  },
}));

// Mock the query keys
jest.mock('@/constants/queryKeys', () => ({
  PERFORMANCES_QUERY_KEYS: {
    favoritesPerformances: 'performances.favorites',
  },
  USERS_QUERY_KEYS: {
    users: 'users',
    favoriteUsers: 'favoriteUsers',
  },
}));

const mockedPerformancesApi = performancesApi as jest.Mocked<typeof performancesApi>;
const mockedUsersApi = usersApi as jest.Mocked<typeof usersApi>;

describe('useFavorite hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('favoritePerformancesOptions', () => {
    it('should return correct query options structure', () => {
      const options = favoritePerformancesOptions();

      expect(options).toHaveProperty('queryKey');
      expect(options).toHaveProperty('queryFn');
      expect(options).toHaveProperty('getNextPageParam');
      expect(options).toHaveProperty('initialPageParam');
    });

    it('should use correct query key', () => {
      const options = favoritePerformancesOptions();

      expect(options.queryKey).toEqual([PERFORMANCES_QUERY_KEYS.favoritesPerformances]);
    });

    it('should set initial page param to undefined', () => {
      const options = favoritePerformancesOptions();

      expect(options.initialPageParam).toBeUndefined();
    });

    describe('queryFn', () => {
      it('should call performancesApi.getFavoritePerformances with correct parameters', async () => {
        const mockResponse: GetFavoritePerformancesResponse = {
          performances: [],
          hasNext: false,
          cursorId: 1,
        };

        mockedPerformancesApi.getFavoritePerformances.mockResolvedValueOnce(mockResponse);

        const options = favoritePerformancesOptions(10);
        await options.queryFn({ pageParam: 5, queryKey: [], meta: undefined });

        expect(mockedPerformancesApi.getFavoritePerformances).toHaveBeenCalledWith({
          cursorId: 5,
          size: 10,
        });
      });

      it('should call performancesApi without size when not provided', async () => {
        const mockResponse: GetFavoritePerformancesResponse = {
          performances: [],
          hasNext: false,
          cursorId: 1,
        };

        mockedPerformancesApi.getFavoritePerformances.mockResolvedValueOnce(mockResponse);

        const options = favoritePerformancesOptions();
        await options.queryFn({ pageParam: undefined, queryKey: [], meta: undefined });

        expect(mockedPerformancesApi.getFavoritePerformances).toHaveBeenCalledWith({
          cursorId: undefined,
          size: undefined,
        });
      });

      it('should handle API response correctly', async () => {
        const mockResponse: GetFavoritePerformancesResponse = {
          performances: [
            {
              id: 1,
              title: 'Test Performance',
              poster: 'poster-url',
              startDate: '2024-01-01',
              endDate: '2024-01-02',
              location: 'Test Location',
              isLiked: true,
            },
          ],
          hasNext: true,
          cursorId: 10,
        };

        mockedPerformancesApi.getFavoritePerformances.mockResolvedValueOnce(mockResponse);

        const options = favoritePerformancesOptions();
        const result = await options.queryFn({ pageParam: 1, queryKey: [], meta: undefined });

        expect(result).toEqual(mockResponse);
      });
    });

    describe('getNextPageParam', () => {
      it('should return cursorId when hasNext is true', () => {
        const options = favoritePerformancesOptions();
        const lastPage: GetFavoritePerformancesResponse = {
          performances: [],
          hasNext: true,
          cursorId: 15,
        };

        const nextPageParam = options.getNextPageParam(lastPage, [], undefined, []);

        expect(nextPageParam).toBe(15);
      });

      it('should return undefined when hasNext is false', () => {
        const options = favoritePerformancesOptions();
        const lastPage: GetFavoritePerformancesResponse = {
          performances: [],
          hasNext: false,
          cursorId: 15,
        };

        const nextPageParam = options.getNextPageParam(lastPage, [], undefined, []);

        expect(nextPageParam).toBeUndefined();
      });
    });
  });

  describe('favoriteUsersOptions', () => {
    it('should return correct query options structure', () => {
      const options = favoriteUsersOptions();

      expect(options).toHaveProperty('queryKey');
      expect(options).toHaveProperty('queryFn');
      expect(options).toHaveProperty('getNextPageParam');
      expect(options).toHaveProperty('initialPageParam');
    });

    it('should use correct query key', () => {
      const options = favoriteUsersOptions();

      expect(options.queryKey).toEqual([
        USERS_QUERY_KEYS.users,
        USERS_QUERY_KEYS.favoriteUsers,
      ]);
    });

    it('should set initial page param to undefined', () => {
      const options = favoriteUsersOptions();

      expect(options.initialPageParam).toBeUndefined();
    });

    describe('queryFn', () => {
      it('should call usersApi.getFavoriteUsers with correct parameters', async () => {
        const mockResponse: GetFavoriteUsersResponse = {
          users: [],
          hasNext: false,
          cursorId: 1,
        };

        mockedUsersApi.getFavoriteUsers.mockResolvedValueOnce(mockResponse);

        const options = favoriteUsersOptions(20);
        await options.queryFn({ pageParam: 10, queryKey: [], meta: undefined });

        expect(mockedUsersApi.getFavoriteUsers).toHaveBeenCalledWith({
          cursorId: 10,
          size: 20,
        });
      });

      it('should call usersApi without size when not provided', async () => {
        const mockResponse: GetFavoriteUsersResponse = {
          users: [],
          hasNext: false,
          cursorId: 1,
        };

        mockedUsersApi.getFavoriteUsers.mockResolvedValueOnce(mockResponse);

        const options = favoriteUsersOptions();
        await options.queryFn({ pageParam: undefined, queryKey: [], meta: undefined });

        expect(mockedUsersApi.getFavoriteUsers).toHaveBeenCalledWith({
          cursorId: undefined,
          size: undefined,
        });
      });

      it('should handle API response correctly', async () => {
        const mockResponse: GetFavoriteUsersResponse = {
          users: [
            {
              id: 'user1',
              name: 'Test User',
              profileImage: { src: 'profile-url', alt: 'profile' },
              gender: 'MALE',
              age: 25,
              isLiked: true,
            },
          ],
          hasNext: true,
          cursorId: 20,
        };

        mockedUsersApi.getFavoriteUsers.mockResolvedValueOnce(mockResponse);

        const options = favoriteUsersOptions();
        const result = await options.queryFn({ pageParam: 5, queryKey: [], meta: undefined });

        expect(result).toEqual(mockResponse);
      });
    });

    describe('getNextPageParam', () => {
      it('should return cursorId when hasNext is true', () => {
        const options = favoriteUsersOptions();
        const lastPage: GetFavoriteUsersResponse = {
          users: [],
          hasNext: true,
          cursorId: 25,
        };

        const nextPageParam = options.getNextPageParam(lastPage, [], undefined, []);

        expect(nextPageParam).toBe(25);
      });

      it('should return undefined when hasNext is false', () => {
        const options = favoriteUsersOptions();
        const lastPage: GetFavoriteUsersResponse = {
          users: [],
          hasNext: false,
          cursorId: 25,
        };

        const nextPageParam = options.getNextPageParam(lastPage, [], undefined, []);

        expect(nextPageParam).toBeUndefined();
      });
    });
  });

  describe('integration scenarios', () => {
    it('should handle API errors in queryFn', async () => {
      const error = new Error('API Error');
      mockedPerformancesApi.getFavoritePerformances.mockRejectedValueOnce(error);

      const options = favoritePerformancesOptions();

      await expect(
        options.queryFn({ pageParam: 1, queryKey: [], meta: undefined })
      ).rejects.toThrow('API Error');
    });

    it('should handle different size parameters', () => {
      const options1 = favoritePerformancesOptions(5);
      const options2 = favoritePerformancesOptions(50);
      const options3 = favoritePerformancesOptions();

      // All should have the same query key but different size in API calls
      expect(options1.queryKey).toEqual(options2.queryKey);
      expect(options2.queryKey).toEqual(options3.queryKey);
    });

    it('should handle pagination flow correctly', () => {
      const options = favoriteUsersOptions();

      // First page
      const firstPage: GetFavoriteUsersResponse = {
        users: [{ id: 'user1', name: 'User 1', profileImage: null, gender: 'MALE', age: 25, isLiked: true }],
        hasNext: true,
        cursorId: 10,
      };

      // Last page
      const lastPage: GetFavoriteUsersResponse = {
        users: [{ id: 'user2', name: 'User 2', profileImage: null, gender: 'FEMALE', age: 30, isLiked: true }],
        hasNext: false,
        cursorId: 20,
      };

      expect(options.getNextPageParam(firstPage, [], undefined, [])).toBe(10);
      expect(options.getNextPageParam(lastPage, [], undefined, [])).toBeUndefined();
    });
  });
});