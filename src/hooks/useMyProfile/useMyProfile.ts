import { useQuery } from '@tanstack/react-query';
import { profilesApi } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useMyProfile = () =>
  useQuery<FullProfile, Error>({
    queryKey: ['myProfile'] as const,
    queryFn: () => profilesApi.getProfile('me'),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
