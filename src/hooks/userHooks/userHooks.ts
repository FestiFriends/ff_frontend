import { useQuery } from '@tanstack/react-query';
import { USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { usersApi } from '@/services/usersService';
import { ApiResponse } from '@/types/api';
import { UserIdResponse } from '@/types/users';

export const useGetUserId = () =>
  useQuery<UserIdResponse, ApiResponse>({
    queryKey: [USERS_QUERY_KEYS.users, USERS_QUERY_KEYS.userId],
    queryFn: usersApi.getUserId,
  });
