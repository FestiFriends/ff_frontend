import { useQuery } from '@tanstack/react-query';
import { profilesApi } from '@/services/profileService';

export const useJoinedGroups = (userId: string) =>
  useQuery({
    queryKey: ['joinedGroups', userId],
    queryFn: () => profilesApi.getJoinedGroups(userId),
    enabled: !!userId,
  });
