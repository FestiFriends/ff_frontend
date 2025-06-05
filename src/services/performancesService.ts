import apiFetcher from '@/lib/apiFetcher';
import {
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
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

  patchLiked: async ({ performanceId, isLiked }: PerformanceIsLikedData) =>
    await apiFetcher.patch<PerformanceIsLikedResponse>(
      `/api/v1/performances/${performanceId}/favorites`,
      { isLiked }
    ),
};
