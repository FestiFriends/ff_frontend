import apiFetcher from '@/lib/apiFetcher';
import {
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
  PerformanceDetailResponse,
} from '@/types/performance';

export const performancesApi = {
  getTopFavorites: async () =>
    await apiFetcher.get<PerformancesResponse>(
      '/api/v1/performances/top-favorites'
    ),

  getTopByGroupCount: async () =>
    await apiFetcher.get<PerformancesResponse>(
      '/api/v1/performances/top-groups'
    ),

  getFavoritePerformances: async () => {
    const res = await apiFetcher.get<PerformancesResponse>(
      '/api/v1/performances/favorites'
    );
    return res.data;
  },

  patchLiked: async ({ performanceId, isLiked }: PerformanceIsLikedData) =>
    await apiFetcher.patch<PerformanceIsLikedResponse>(
      `/api/v1/performances/${performanceId}/favorites`,
      { isLiked }
    ),

  getPerformanceDetail: async (performanceId: string) =>
    await apiFetcher.get<PerformanceDetailResponse>(
      `/api/v1/performances/${performanceId}`
    ),
};
