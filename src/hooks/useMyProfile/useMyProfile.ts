import { useQuery } from '@tanstack/react-query';
import { USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { profilesApi } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useMyProfile = () =>
  useQuery<FullProfile, Error>({
    queryKey: [USERS_QUERY_KEYS.myProfile] as const,
    queryFn: () => profilesApi.getProfile('me'),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
