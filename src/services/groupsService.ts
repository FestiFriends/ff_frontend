import QueryString from 'qs';
import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { CursorResponse } from '@/types/api';
import { Gender } from '@/types/enums';
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
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

const formatDateWithKoreanTimezone = (date: Date): string => {
  const utcTime = new Date(
    date.getTime()
      + 9 * 60 * 60 * 1000
      + 23 * 60 * 60 * 1000
      + 59 * 60 * 1000
      + 59 * 1000
  );
  return utcTime.toISOString().split('.')[0] + 'Z';
};

interface GroupPostsResponse {
  groupId: number;
  posts: Post[];
}

interface GetGroupPostsParams {
  groupId: string;
  cursorId?: number;
  size?: number;
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

  getGroupPosts: async ({
    groupId,
    cursorId,
    size = 20,
  }: GetGroupPostsParams) => {
    const res = await apiFetcher.get<
      { data: GroupPostsResponse } & CursorResponse
    >(`/api/v1/groups/${groupId}/posts`, {
      params: {
        cursorId,
        size,
      },
    });

    return res.data;
  },

  createGroup: async (performanceId: string, data: CreateGroupFormData) => {
    const apiRequest: CreateGroupApiRequest = {
      performanceId,
      title: data.title,
      category: data.category,
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
        ? formatDateWithKoreanTimezone(data.dateRange.startDate)
        : '',
      endDate: data.dateRange.endDate
        ? formatDateWithKoreanTimezone(data.dateRange.endDate)
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
