import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { GroupSchedule } from '@/types/group';

export const useSchedules = (groupId: string, start: Date, end: Date) => {
  const startDate = format(start, 'yyyy-MM-dd');
  const endDate = format(end, 'yyyy-MM-dd');

  return useQuery<GroupSchedule[], Error>({
    queryKey: [GROUP_QUERY_KEYS.schedules, groupId, startDate, endDate],
    queryFn: () => groupsApi.getSchedules(groupId, { startDate, endDate }),
    enabled: !!groupId,
    staleTime: 1000 * 60,
  });
};
