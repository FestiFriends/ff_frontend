import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { FullProfile } from '@/types/profiles';

export const profilesApi = {
  getProfile: async (userId: string) =>
    await apiFetcher
      .get<{ data: FullProfile }>(`/api/profiles/${userId}`)
      .then((res) => res.data),

  updateProfile: async (data: Partial<FullProfile>) =>
    await apiFetcher.patch<ApiResponse>(`/api/profiles/me`, data),
};
