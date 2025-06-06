import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { GroupsResponse } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGetGroups = (
  performanceId: string,
  page?: number,
  size?: number,
  sortType?: string
) =>
  useQuery<GroupsResponse>({
    queryKey: [GROUP_QUERY_KEYS.groups, performanceId, page, size, sortType],
    queryFn: async () => {
      const res = await groupsApi.getGroups(
        performanceId,
        page,
        size,
        sortType
      );
      return res.data;
    },
    placeholderData: (previousData: GroupsResponse | undefined) => previousData,
  });
