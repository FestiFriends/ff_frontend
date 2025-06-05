import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { PERFORMANCES_QUERY_KEYS } from '@/constants/queryKeys';
import { notificationsApi } from '@/services/notificationsService';
import { ApiResponse, CursorRequest } from '@/types/api';
import { GetNotificationsResponse } from '@/types/notification';

export const useInfiniteNotifications = (size: CursorRequest['size']) =>
  useInfiniteQuery<
    AxiosResponse<GetNotificationsResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<GetNotificationsResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [PERFORMANCES_QUERY_KEYS.notifications],
    queryFn: ({ pageParam }) =>
      notificationsApi.getNotifications({ cursorId: pageParam, size }),

    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });

export const useGetTopFavoritesPerformances = () =>
  useQuery({
    queryKey: [
      PERFORMANCES_QUERY_KEYS.notifications,
      PERFORMANCES_QUERY_KEYS.newNotifications,
    ],
    queryFn: notificationsApi.getNewNotificationsCheck,
  });
