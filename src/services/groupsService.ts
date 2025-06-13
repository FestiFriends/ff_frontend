import * as qs from 'qs';
import apiFetcher from '@/lib/apiFetcher';
import { GetGroupsParams } from '@/types/group';
import { PerformanceGroupsApiResponse } from '@/utils/formatGroupCardData';

export const groupsApi = {
  getGroups: async (params: GetGroupsParams) => {
    const { performanceId, ...rest } = params;
    const queryString = qs.stringify({ ...rest }, { skipNulls: true });

    return await apiFetcher.get<PerformanceGroupsApiResponse>(
      `/api/v1/performances/${performanceId}/groups?${queryString}`
    );
  },
};
