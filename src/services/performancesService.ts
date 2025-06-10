import apiFetcher from '@/lib/apiFetcher';
import {
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
  PerformanceDetailResponse,
  GetPerformancesParams,
} from '@/types/performance';

export const performancesApi = {
  getPerformances: async (params: GetPerformancesParams = {}) => {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();

    return await apiFetcher.get<PerformancesResponse>(
      `/api/v1/performances?${query}`
    );
  },
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
  getPerformanceDetail: async (performanceId: string) =>
    await apiFetcher.get<PerformanceDetailResponse>(
      `/api/v1/performances/${performanceId}`
    ),
};
