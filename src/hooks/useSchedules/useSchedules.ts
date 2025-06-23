import { useQuery } from '@tanstack/react-query';
import { formatISO } from 'date-fns';
import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { GroupSchedule } from '@/types/group';

export const useSchedules = (groupId: string, start: Date, end: Date) => {
  const startDate = start.toISOString();
  const endDate = formatISO(end.valueOf() + 9 * 60 * 60 * 1000);

  return useQuery<GroupSchedule[], Error>({
    queryKey: [GROUP_QUERY_KEYS.schedules, groupId, startDate, endDate],
    queryFn: () => groupsApi.getSchedules(groupId, { startDate, endDate }),
    enabled: !!groupId,
  });
};
