import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { NOTIFICATIONS_QUERY_KEYS } from '@/constants/queryKeys';
import { notificationsApi } from '@/services/notificationsService';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  GetNewNotificationsCheckResponse,
  GetNotificationsResponse,
} from '@/types/notification';

export const useInfiniteNotifications = (size: CursorRequest['size']) =>
  useInfiniteQuery<
    AxiosResponse<GetNotificationsResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<GetNotificationsResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
    queryFn: ({ pageParam }) =>
      notificationsApi.getNotifications({ cursorId: pageParam, size }),

    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });

export const useGetNewNotificationsCheck = () =>
  useQuery({
    queryKey: [
      NOTIFICATIONS_QUERY_KEYS.notifications,
      NOTIFICATIONS_QUERY_KEYS.newNotifications,
    ],
    queryFn: notificationsApi.getNewNotificationsCheck,
  });

export const usePatchReadNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiResponse>({
    mutationFn: async () => {
      const response = await notificationsApi.patchReadNotifications();
      return response.data;
    },

    onMutate: async () => {
      queryClient.setQueryData(
        [
          NOTIFICATIONS_QUERY_KEYS.notifications,
          NOTIFICATIONS_QUERY_KEYS.newNotifications,
        ],
        (old: { data: GetNewNotificationsCheckResponse }) => ({
          ...old,
          data: { ...old.data, data: { hasUnread: false } },
        })
      );
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
      }),
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiResponse>({
    mutationFn: async () => {
      const response = await notificationsApi.deleteAllNotifications();
      return response.data;
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
      }),
  });
};

export const useDeleteNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiResponse, string>({
    mutationFn: async (id) => {
      const response = await notificationsApi.deleteNotifications(id);
      return response.data;
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
      }),
  });
};
