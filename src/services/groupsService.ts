import apiFetcher from '@/lib/apiFetcher';
import { GroupsResponse } from '@/types/group';

export const groupsApi = {
  getGroups: async (id: string) => {
    const res = await apiFetcher.get<GroupsResponse>(
      `/api/v1/performances/${id}/groups`
    );
    return res.data;
  },
};
