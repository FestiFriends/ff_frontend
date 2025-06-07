import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { GetGroupsParams, GroupsResponse } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGetGroups = ({
  performanceId,
  page = 1,
  size = 20,
  sortType,
  category,
  startDate,
  endDate,
  location,
  gender,
}: GetGroupsParams) =>
  useQuery<GroupsResponse>({
    queryKey: [
      GROUP_QUERY_KEYS.groups,
      performanceId,
      page,
      sortType,
      category,
      startDate,
      endDate,
      location,
      gender,
    ],
    queryFn: async () => {
      const res = await groupsApi.getGroups({
        performanceId,
        page,
        size,
        sortType,
        category,
        startDate,
        endDate,
        location,
        gender,
      });
      return res.data;
    },
    placeholderData: (previousData: GroupsResponse | undefined) => previousData,
  });
