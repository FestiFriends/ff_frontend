import apiFetcher from '@/lib/apiFetcher';
import { CursorRequest } from '@/types/api';
import {
  GetNewNotificationsCheckResponse,
  GetNotificationsResponse,
} from '@/types/notification';

export const notificationsApi = {
  getNotifications: async ({ cursorId, size = 20 }: CursorRequest) =>
    await apiFetcher.get<GetNotificationsResponse>('/api/v1/notifications', {
      params: { cursorId, size },
    }),

  getNewNotificationsCheck: async () =>
    await apiFetcher.get<GetNewNotificationsCheckResponse>(
      '/api/v1/notifications/unread-exists'
    ),
};
