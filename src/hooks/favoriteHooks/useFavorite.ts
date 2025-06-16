import {
  InfiniteData,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {
  PERFORMANCES_QUERY_KEYS,
  USERS_QUERY_KEYS,
} from '@/constants/queryKeys';
import { performancesApi } from '@/services/performancesService';
import { usersApi } from '@/services/usersService';
import { ApiResponse, CursorRequest } from '@/types/api';
import { GetFavoritePerformancesResponse } from '@/types/performance';
import { GetFavoriteUsersResponse } from '@/types/users';

export const favoritePerformancesOptions = (
  size?: CursorRequest['size']
): UseSuspenseInfiniteQueryOptions<
  GetFavoritePerformancesResponse,
  ApiResponse,
  InfiniteData<GetFavoritePerformancesResponse>,
  GetFavoritePerformancesResponse,
  string[],
  number | undefined
> => ({
  queryKey: [PERFORMANCES_QUERY_KEYS.favoritesPerformances],
  queryFn: ({ pageParam }) =>
    performancesApi.getFavoritePerformances({
      cursorId: pageParam,
      size,
    }),

  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
  initialPageParam: undefined,
});

export const favoriteUsersOptions = (
  size?: CursorRequest['size']
): UseSuspenseInfiniteQueryOptions<
  GetFavoriteUsersResponse,
  ApiResponse,
  InfiniteData<GetFavoriteUsersResponse>,
  GetFavoriteUsersResponse,
  string[],
  number | undefined
> => ({
  queryKey: [USERS_QUERY_KEYS.users, USERS_QUERY_KEYS.favoriteUsers],
  queryFn: ({ pageParam }) =>
    usersApi.getFavoriteUsers({
      cursorId: pageParam,
      size,
    }),

  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
  initialPageParam: undefined,
});
