import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { useQuery } from '@tanstack/react-query';

export const useGetGroups = (
  performanceId: string,
  page: number = 1,
  size: number = 20
) =>
  useQuery({
    queryKey: [GROUP_QUERY_KEYS.groups, performanceId, page, size],
    queryFn: () => groupsApi.getGroups(performanceId, page, size),
  });
