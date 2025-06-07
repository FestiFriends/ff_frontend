import apiFetcher from '@/lib/apiFetcher';
import { GetGroupsParams, GroupsResponse } from '@/types/group';

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
    await apiFetcher.get<GroupsResponse>(
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
};
