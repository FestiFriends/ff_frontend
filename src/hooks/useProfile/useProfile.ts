import { useQuery } from '@tanstack/react-query';
import { profilesApi } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useProfile = (userId: string) =>
  useQuery<FullProfile, Error>({
    queryKey: ['profile', userId] as const,
    queryFn: () => profilesApi.getProfile(userId),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
