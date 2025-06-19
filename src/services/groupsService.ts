import QueryString from 'qs';
import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { GroupCategory, Gender } from '@/types/enums';
import {
  GetGroupsParams,
  GroupInfoResponse,
  GroupSchedule,
  PostJoinGroupRequest,
  CreateGroupApiRequest,
  CreateGroupFormData,
  ScheduleRequest,
  GetGroupMembersRequest,
  GetGroupMembersResponse,
  PatchGroupMemberRoleRequest,
  DeleteGroupMemberRequest,
  UpdateGroupApiRequest,
} from '@/types/group';
import { Post } from '@/types/post';
import { formatPostDate } from '@/utils/date';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

interface GroupPostsResponse {
  groupId: number;
  posts: Post[];
}

export const groupsApi = {
  getGroups: async (params: GetGroupsParams) => {
    const { performanceId, ...rest } = params;
    const queryString = QueryString.stringify({ ...rest }, { skipNulls: true });

    return await apiFetcher.get<PerformanceGroupsApiResponse>(
      `/api/v1/performances/${performanceId}/groups?${queryString}`
    );
  },

  getGroupInfo: async (groupId: string) =>
    (await apiFetcher.get<GroupInfoResponse>(`/api/v1/groups/${groupId}`)).data,

  postJoinGroup: async ({ groupId, description }: PostJoinGroupRequest) =>
    (
      await apiFetcher.post<ApiResponse>(`/api/v1/groups/${groupId}/join`, {
        description,
      })
    ).data,

  getGroupPosts: async ({ groupId }: { groupId: string }) => {
    const res = await apiFetcher.get<{ data: GroupPostsResponse }>(
      `/api/v1/groups/${groupId}/posts`
    );
    return {
      ...res.data.data,
      posts: res.data.data.posts.map((post) => ({
        ...post,
        createdAt: formatPostDate(post.createdAt),
      })),
    };
  },

  createGroup: async (performanceId: string, data: CreateGroupFormData) => {
    const apiRequest: CreateGroupApiRequest = {
      performanceId,
      title: data.title,
      category:
        data.category === '동행'
          ? GroupCategory.COMPANION
          : data.category === '탑승'
            ? GroupCategory.RIDE_SHARE
            : GroupCategory.ROOM_SHARE,
      gender:
        data.gender === '남성'
          ? Gender.MALE
          : data.gender === '여성'
            ? Gender.FEMALE
            : Gender.ALL,
      startAge: data.ageRange[0],
      endAge: data.ageRange[1],
      location: data.region,
      startDate: data.dateRange.startDate
        ? data.dateRange.startDate.toISOString()
        : '',
      endDate: data.dateRange.endDate
        ? data.dateRange.endDate.toISOString()
        : '',
      maxMembers: data.maxParticipants,
      description: data.description,
      hashtag: data.tags,
    };

    return await apiFetcher.post<
      ApiResponse<{ groupId: string; performanceId: string }>
    >(`/api/v1/groups`, apiRequest);
  },

  getSchedules: async (
    groupId: string,
    params: { startDate: string; endDate: string }
  ): Promise<GroupSchedule[]> => {
    const queryString = QueryString.stringify(params, { skipNulls: true });

    const response = await apiFetcher.get<{
      code: number;
      message: string;
      data: {
        scheduleCount: number;
        schedules: GroupSchedule[];
      };
    }>(`/api/v1/groups/${groupId}/schedules?${queryString}`);

    return response.data.data?.schedules ?? [];
  },
  postSchedule: async (groupId: string, body: ScheduleRequest) =>
    await apiFetcher.post(`/api/v1/groups/${groupId}/schedules`, body),

  updateSchedule: async (
    groupId: string,
    scheduleId: string,
    body: ScheduleRequest
  ) =>
    await apiFetcher.patch(
      `/api/v1/groups/${groupId}/schedules/${scheduleId}`,
      body
    ),

  deleteSchedule: async (groupId: string, scheduleId: string) =>
    await apiFetcher.delete(
      `/api/v1/groups/${groupId}/schedules/${scheduleId}`
    ),

  getGroupMembers: async ({
    groupId,
    cursorId,
    size = 20,
  }: GetGroupMembersRequest) =>
    (
      await apiFetcher.get<GetGroupMembersResponse>(
        `/api/v1/groups/${groupId}/members`,
        {
          params: { groupId, cursorId, size },
        }
      )
    ).data,

  patchGroupMemberRole: async ({
    groupId,
    memberId,
    role,
  }: PatchGroupMemberRoleRequest) =>
    (
      await apiFetcher.patch<ApiResponse>(
        `/api/v1/groups/${groupId}/members/${memberId}/role`,
        { role }
      )
    ).data,

  deleteGroupMember: async ({ groupId, memberId }: DeleteGroupMemberRequest) =>
    (
      await apiFetcher.delete<ApiResponse>(
        `/api/v1/groups/${groupId}/members/${memberId}`
      )
    ).data,

  patchUpdateGroup: async (
    groupId: string,
    groupData: UpdateGroupApiRequest
  ) => {
    const response = await apiFetcher.patch<ApiResponse>(
      `/api/v1/groups/${groupId}`,
      groupData
    );

    return response.data;
  },
};
