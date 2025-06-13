import apiFetcher from '@/lib/apiFetcher';
import { CursorRequest } from '@/types/api';
import { GetFavoriteUsersResponse, UserIdResponse } from '@/types/users';

export const usersApi = {
  getFavoriteUsers: async ({ cursorId, size = 10 }: CursorRequest) =>
    await apiFetcher.get<GetFavoriteUsersResponse>('/api/v1/users/favorites', {
      params: { cursorId, size },
    }),
  getUserId: async () =>
    (await apiFetcher.get<UserIdResponse>('/api/v1/users/id')).data,
};
