import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { ApiResponse } from '@/types/api';
import {
  GetGroupsParams,
  GroupInfoResponse,
  PostJoinGroupRequest,
} from '@/types/group';
import { GroupPostsResponse } from '@/types/post';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

export const useGetGroups = (params: GetGroupsParams) =>
  useQuery<PerformanceGroupsApiResponse>({
    queryKey: [GROUP_QUERY_KEYS.groups, params],
    queryFn: async () => {
      const res = await groupsApi.getGroups(params);
      return res.data;
    },
    placeholderData: (previousData: PerformanceGroupsApiResponse | undefined) =>
      previousData,
  });

export const useGetGroupInfo = (groupId: string) =>
  useQuery<GroupInfoResponse>({
    queryKey: [GROUP_QUERY_KEYS.groupInfo],
    queryFn: async () => await groupsApi.getGroupInfo(groupId),
  });

export const usePostJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, PostJoinGroupRequest>({
    mutationFn: ({ groupId, description }: PostJoinGroupRequest) =>
      groupsApi.postJoinGroup({ groupId, description }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.joinGroup],
      });
    },

    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.joinGroup],
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.joinGroup],
      });
    },
  });
};

export const useGetGroupPosts = ({ groupId }: { groupId: string }) =>
  useQuery<GroupPostsResponse>({
    queryKey: [GROUP_QUERY_KEYS.groupPosts, groupId],
    queryFn: async () => {
      const res = await groupsApi.getGroupPosts({ groupId });
      return {
        ...res,
        groupId: String(res.groupId),
      };
    },
  });
