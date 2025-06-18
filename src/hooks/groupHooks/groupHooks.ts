import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { ApiResponse } from '@/types/api';
import { GetGroupsParams, CreateGroupFormData } from '@/types/group';
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

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    ApiResponse<{ groupId: string; performanceId: string }>,
    ApiResponse,
    { performanceId: string; data: CreateGroupFormData }
  >({
    mutationFn: async ({ performanceId, data }) => {
      const response = await groupsApi.createGroup(performanceId, data);
      return response.data;
    },

    onSuccess: (response, { performanceId }) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groups, performanceId],
      });

      router.push(`/performances/${performanceId}`);
    },

    onError: (error) => {
      console.error('Error creating group:', error);
    },
  });
};
