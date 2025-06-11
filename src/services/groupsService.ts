import apiFetcher from '@/lib/apiFetcher';
import { GetGroupsParams } from '@/types/group';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

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
};
