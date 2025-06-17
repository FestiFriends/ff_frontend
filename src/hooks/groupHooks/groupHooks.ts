import { useQuery } from '@tanstack/react-query';
import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { GetGroupsParams } from '@/types/group';
import { Post } from '@/types/post';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

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
  useQuery<PerformanceGroupsApiResponse>({
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
    placeholderData: (previousData: PerformanceGroupsApiResponse | undefined) =>
      previousData,
  });

interface GroupPostsResponse {
  groupId: number;
  posts: Post[];
}

export const useGetGroupPosts = ({ groupId }: { groupId: string }) =>
  useQuery<GroupPostsResponse>({
    queryKey: [GROUP_QUERY_KEYS.groupPosts, groupId],
    queryFn: async () => {
      const res = await groupsApi.getGroupPosts({ groupId });
      return res;
    },
  });
