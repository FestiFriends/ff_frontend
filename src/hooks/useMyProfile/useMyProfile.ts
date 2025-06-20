import { useQuery } from '@tanstack/react-query';
import { USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { profilesApi } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useMyProfile = () =>
  useQuery<FullProfile, Error>({
    queryKey: [USERS_QUERY_KEYS.myProfile],
    queryFn: () => profilesApi.getProfile('me'),
    retry: (failureCount, error) => {
      if (error instanceof Response && error.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
