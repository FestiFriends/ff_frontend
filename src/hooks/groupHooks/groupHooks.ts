import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { GROUP_QUERY_KEYS } from '@/constants/queryKeys';
import { groupsApi } from '@/services/groupsService';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  DeleteGroupMemberRequest,
  GetGroupMembersFormattedResponse,
  GetGroupMembersRequest,
  GetGroupMembersResponse,
  GetGroupsParams,
  GroupInfoResponse,
  PatchGroupMemberRoleRequest,
  PostJoinGroupRequest,
} from '@/types/group';
import { CreateGroupFormData } from '@/types/group';
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
    queryKey: [GROUP_QUERY_KEYS.groupInfo, groupId],
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

export const useGetGroupMembers = (
  groupId: GetGroupMembersRequest['groupId'],
  size: CursorRequest['size']
) =>
  useQuery<GetGroupMembersResponse>({
    queryKey: [GROUP_QUERY_KEYS.groupMembers, groupId, size],
    queryFn: () =>
      groupsApi.getGroupMembers({ groupId, cursorId: undefined, size }),
  });

export const infiniteGroupMembersOptions = (
  groupId: GetGroupMembersRequest['groupId'],
  size: CursorRequest['size']
): UseSuspenseInfiniteQueryOptions<
  GetGroupMembersFormattedResponse,
  ApiResponse,
  InfiniteData<GetGroupMembersFormattedResponse>,
  GetGroupMembersFormattedResponse,
  string[],
  number | undefined
> => ({
  queryKey: [GROUP_QUERY_KEYS.groupMembers, groupId, (size ?? 20).toString()],
  queryFn: async ({ pageParam }) => {
    const res = await groupsApi.getGroupMembers({
      groupId,
      cursorId: pageParam,
      size,
    });
    return {
      data: res.data.members,
      groupId: res.data.groupId,
      performanceId: res.data.performanceId,
      memberCount: res.data.memberCount,
      isHost: res.data.isHost,
      cursorId: res.cursorId,
      hasNext: res.hasNext,
      code: res.code,
      message: res.message,
    };
  },
  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
  initialPageParam: undefined,
});

export const usePatchGroupMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, PatchGroupMemberRoleRequest>({
    mutationFn: ({ groupId, memberId, role }: PatchGroupMemberRoleRequest) =>
      groupsApi.patchGroupMemberRole({ groupId, memberId, role }),

    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupMembers, groupId],
      });
    },
  });
};

export const useDeleteGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, ApiResponse, DeleteGroupMemberRequest>({
    mutationFn: ({ groupId, memberId }: DeleteGroupMemberRequest) =>
      groupsApi.deleteGroupMember({ groupId, memberId }),

    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupMembers, groupId],
      });
    },
  });
};
