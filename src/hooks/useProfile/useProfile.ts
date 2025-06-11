import { useQuery } from '@tanstack/react-query';
import { profilesApi } from '@/services/profileService';
import { FullProfile } from '@/types/profiles';

export const useProfile = (userId: string) =>
  useQuery({
    queryKey: ['profile', userId],
    queryFn: (): Promise<FullProfile> =>
      profilesApi.getProfile(userId).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
