import apiFetcher from '@/lib/apiFetcher';
import { GroupsResponse } from '@/types/group';

export const groupsApi = {
  getGroups: async (
    performanceId: string,
    page: number = 1,
    size: number = 20
  ) =>
    await apiFetcher.get<GroupsResponse>(
      `/api/v1/performances/${performanceId}/groups`,
      { params: { page, size } }
    ),
};
