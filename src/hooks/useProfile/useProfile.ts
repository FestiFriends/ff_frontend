import { useQuery } from '@tanstack/react-query';
import { USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { profilesApi } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useProfile = (userId: string) =>
  useQuery<FullProfile, Error>({
    queryKey: USERS_QUERY_KEYS.profile(userId),
    queryFn: () => profilesApi.getProfile(userId),
    staleTime: 1000 * 60,
    retry: (failureCount, error) => {
      if (error instanceof Response && error.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
