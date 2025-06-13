import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { FullProfile } from '@/types/profiles';

export const profilesApi = {
  getProfile: async (userId: string) => {
    const res = await apiFetcher.get<ApiResponse<FullProfile>>(
      `/api/profiles/${userId}`
    );
    return res.data.data!;
  },
  updateProfile: async (data: Partial<FullProfile>) => {
    const { data: updated } = await apiFetcher.patch<ApiResponse<FullProfile>>(
      '/api/profiles/me',
      data
    );
    return updated;
  },
};
