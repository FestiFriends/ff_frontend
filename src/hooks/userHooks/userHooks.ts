import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { usersApi } from '@/services/usersService';
import { ApiResponse } from '@/types/api';
import { FullProfile } from '@/types/profiles';
import { UserIdResponse } from '@/types/users';

export const useGetUserId = () =>
  useQuery<UserIdResponse, ApiResponse>({
    queryKey: [USERS_QUERY_KEYS.users, USERS_QUERY_KEYS.userId],
    queryFn: usersApi.getUserId,
  });

interface ToggleUserLikeParams {
  userId: string;
  isLiked: boolean;
}

interface ToggleUserLikeResponse {
  isLiked: boolean;
  userId: string;
}

interface ToggleUserLikeContext {
  previousProfile?: FullProfile;
}

export const useToggleUserLike = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleUserLikeResponse,
    ApiResponse,
    ToggleUserLikeParams,
    ToggleUserLikeContext
  >({
    mutationFn: ({
      userId,
      isLiked,
    }: ToggleUserLikeParams): Promise<ToggleUserLikeResponse> =>
      usersApi.updateLikeUser(userId, isLiked),

    onMutate: async ({ userId, isLiked }): Promise<ToggleUserLikeContext> => {
      await queryClient.cancelQueries({
        queryKey: USERS_QUERY_KEYS.profile(userId),
      });

      const previousProfile = queryClient.getQueryData<FullProfile>(
        USERS_QUERY_KEYS.profile(userId)
      );

      if (previousProfile) {
        queryClient.setQueryData(USERS_QUERY_KEYS.profile(userId), {
          ...previousProfile,
          isLiked,
        });
      }

      return { previousProfile };
    },

    onError: (_error, { userId }, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          USERS_QUERY_KEYS.profile(userId),
          context.previousProfile
        );
      }
    },

    onSettled: (_data, _error, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.profile(userId),
      });
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.favoriteUsers],
      });
    },
  });
};
