import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { FullProfile, ProfileEditRequest } from '@/types/profiles';

export const profilesApi = {
  getProfile: async (userId: string) => {
    const res = await apiFetcher.get<ApiResponse<FullProfile>>(
      `/api/v1/profiles/${userId}`
    );
    return res.data.data!;
  },
  updateProfile: async (data: ProfileEditRequest) => {
    const { data: updated } = await apiFetcher.patch<ApiResponse<FullProfile>>(
      '/api/v1/profiles/me',
      data
    );
    return updated;
  },
};
