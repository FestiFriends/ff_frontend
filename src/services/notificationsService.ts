import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  GetNewNotificationsCheckResponse,
  GetNotificationsResponse,
} from '@/types/notification';

export const notificationsApi = {
  getNotifications: async ({ cursorId, size = 20 }: CursorRequest) =>
    (
      await apiFetcher.get<GetNotificationsResponse>('/api/v1/notifications', {
        params: { cursorId, size },
      })
    ).data,

  getNewNotificationsCheck: async () =>
    (
      await apiFetcher.get<GetNewNotificationsCheckResponse>(
        '/api/v1/notifications/unread-exists'
      )
    ).data,

  patchReadNotifications: async (id: string) =>
    (await apiFetcher.patch<ApiResponse>(`/api/v1/notifications/${id}`)).data,

  patchReadAllNotifications: async () =>
    (await apiFetcher.patch<ApiResponse>('/api/v1/notifications')).data,

  deleteAllNotifications: async () =>
    (await apiFetcher.delete<ApiResponse>('/api/v1/notifications')).data,

  deleteNotifications: async (id: string) =>
    (await apiFetcher.delete<ApiResponse>(`/api/v1/notifications/${id}`)).data,
};
