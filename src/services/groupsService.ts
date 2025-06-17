import apiFetcher from '@/lib/apiFetcher';
import { GetGroupsParams } from '@/types/group';
import { Post } from '@/types/post';
import { formatPostDate } from '@/utils/date';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

interface GroupPostsResponse {
  groupId: number;
  posts: Post[];
}

export const groupsApi = {
  getGroups: async ({
    performanceId,
    page,
    size,
    sortType,
    category,
    startDate,
    endDate,
    location,
    gender,
  }: GetGroupsParams) =>
    await apiFetcher.get<PerformanceGroupsApiResponse>(
      `/api/v1/performances/${performanceId}/groups`,
      {
        params: {
          page,
          size,
          sortType,
          category,
          startDate,
          endDate,
          location,
          gender,
        },
      }
    ),

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
