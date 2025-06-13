import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  PERFORMANCES_QUERY_KEYS,
  USERS_QUERY_KEYS,
} from '@/constants/queryKeys';
import { performancesApi } from '@/services/performancesService';
import { usersApi } from '@/services/usersService';
import { ApiResponse, CursorRequest } from '@/types/api';
import { GetFavoritePerformancesResponse } from '@/types/performance';
import { GetFavoriteUsersResponse } from '@/types/users';

export const useFavoritePerformances = (size: CursorRequest['size']) =>
  useInfiniteQuery<
    AxiosResponse<GetFavoritePerformancesResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<GetFavoritePerformancesResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [PERFORMANCES_QUERY_KEYS.favoritesPerformances],
    queryFn: ({ pageParam }) =>
      performancesApi.getFavoritePerformances({
        cursorId: pageParam,
        size,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });

export const useFavoriteUsers = (size: CursorRequest['size']) =>
  useInfiniteQuery<
    AxiosResponse<GetFavoriteUsersResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<GetFavoriteUsersResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [USERS_QUERY_KEYS.favoriteUsers],
    queryFn: ({ pageParam }) =>
      usersApi.getFavoriteUsers({ cursorId: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });
