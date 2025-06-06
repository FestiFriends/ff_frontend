import apiFetcher from '@/lib/apiFetcher';
import { GroupsResponse } from '@/types/group';

export const groupsApi = {
  getGroups: async (performanceId: string, page: number, size: number) =>
    await apiFetcher.get<GroupsResponse>(
      `/api/v1/performances/${performanceId}/groups?page=${page}&size=${size}`
    ),
};
