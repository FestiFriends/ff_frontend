import QueryString from 'qs';
import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import {
  GetGroupsParams,
  GroupInfoResponse,
  PostJoinGroupRequest,
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
};
