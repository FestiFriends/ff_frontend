import QueryString from 'qs';
import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { GetGroupsParams, PostJoinGroupRequest } from '@/types/group';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

export const groupsApi = {
  getGroups: async (params: GetGroupsParams) => {
    const { performanceId, ...rest } = params;
    const queryString = QueryString.stringify({ ...rest }, { skipNulls: true });

    return await apiFetcher.get<PerformanceGroupsApiResponse>(
      `/api/v1/performances/${performanceId}/groups?${queryString}`
    );
  },
  postJoinGroup: async ({ groupId, description }: PostJoinGroupRequest) =>
    (
      await apiFetcher.post<ApiResponse>(`/api/v1/groups/${groupId}/join`, {
        description,
      })
    ).data,
};
