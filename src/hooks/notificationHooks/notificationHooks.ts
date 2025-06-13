import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { NOTIFICATIONS_QUERY_KEYS } from '@/constants/queryKeys';
import { notificationsApi } from '@/services/notificationsService';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  GetNewNotificationsCheckResponse,
  GetNotificationsResponse,
} from '@/types/notification';

export const infiniteNotificationsOptions = (
  size?: CursorRequest['size']
): UseSuspenseInfiniteQueryOptions<
  GetNotificationsResponse,
  ApiResponse,
  InfiniteData<GetNotificationsResponse>,
  GetNotificationsResponse,
  string[],
  number | undefined
> => ({
  queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
  queryFn: ({ pageParam }) =>
    notificationsApi.getNotifications({ cursorId: pageParam, size }),

  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
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
  return useMutation<ApiResponse, ApiResponse, string>({
    mutationFn: async (id) => await notificationsApi.patchReadNotifications(id),

    onMutate: async (id) => {
      queryClient.setQueryData(
        [NOTIFICATIONS_QUERY_KEYS.notifications],
        (old: InfiniteData<GetNotificationsResponse>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data?.map((n) => ({
              ...n,
              isRead: id === n.id ? true : n.isRead,
            })),
          })),
        })
      );
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
      }),
  });
};

export const usePatchReadAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiResponse>({
    mutationFn: notificationsApi.patchReadAllNotifications,
    onMutate: async () => {
      queryClient.setQueryData(
        [
          NOTIFICATIONS_QUERY_KEYS.notifications,
          NOTIFICATIONS_QUERY_KEYS.newNotifications,
        ],
        (old: GetNewNotificationsCheckResponse) => ({
          ...old,
          data: { hasUnread: false },
        })
      );

      queryClient.setQueryData(
        [NOTIFICATIONS_QUERY_KEYS.notifications],
        (old: InfiniteData<GetNotificationsResponse>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data?.map((n) => ({ ...n, isRead: true })),
          })),
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
    mutationFn: async () => await notificationsApi.deleteAllNotifications(),
    onMutate: () => {
      queryClient.setQueryData(
        [
          NOTIFICATIONS_QUERY_KEYS.notifications,
          NOTIFICATIONS_QUERY_KEYS.newNotifications,
        ],
        (old: GetNewNotificationsCheckResponse) => ({
          ...old,
          data: { hasUnread: false },
        })
      );

      queryClient.setQueryData(
        [NOTIFICATIONS_QUERY_KEYS.notifications],
        (old: InfiniteData<GetNotificationsResponse>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: [],
          })),
        })
      );
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
    mutationFn: async (id) => await notificationsApi.deleteNotifications(id),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEYS.notifications],
      }),
  });
};
