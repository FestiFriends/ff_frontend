import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse, CursorRequest } from '@/types/api';
import { ToggleUserLikeResponse } from '@/types/users';
import { GetFavoriteUsersResponse, UserIdResponse } from '@/types/users';

export const usersApi = {
  getFavoriteUsers: async ({ cursorId, size = 10 }: CursorRequest) =>
    (
      await apiFetcher.get<GetFavoriteUsersResponse>(
        '/api/v1/users/favorites',
        {
          params: { cursorId, size },
        }
      )
    ).data,
  getUserId: async () =>
    (await apiFetcher.get<UserIdResponse>('/api/v1/users/id')).data,

  updateLikeUser: async (
    userId: string,
    isLiked: boolean
  ): Promise<ToggleUserLikeResponse> => {
    const res = await apiFetcher.patch<ApiResponse<ToggleUserLikeResponse>>(
      `/api/v1/users/favorites/${userId}`,
      { isLiked }
    );

    return res.data.data ?? { isLiked: false, userId: userId };
  },
};

export const getCheckNickname = async (nickname: string): Promise<boolean> => {
  const res = await apiFetcher.get<ApiResponse<{ isAvailable: boolean }>>(
    '/api/v1/users/check-nickname?',
    { params: { nickname } }
  );
  return res.data.data?.isAvailable ?? false;
};
