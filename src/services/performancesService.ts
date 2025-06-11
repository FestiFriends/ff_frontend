import apiFetcher from '@/lib/apiFetcher';
import {
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
  PerformanceDetailResponse,
  PerformancesResponsePagination,
} from '@/types/performance';

export const performancesApi = {
  getTopFavorites: async () =>
    (
      await apiFetcher.get<PerformancesResponse>(
        '/api/v1/performances/top-favorites'
      )
    ).data,

  getTopByGroupCount: async () =>
    (
      await apiFetcher.get<PerformancesResponse>(
        '/api/v1/performances/top-groups'
      )
    ).data,


  getFavoritePerformances: async () => {
    const res = await apiFetcher.get<PerformancesResponse>(
      '/api/v1/performances/favorites'
    );
    return res.data;
  },

  patchLiked: async ({ performanceId, isLiked }: PerformanceIsLikedData) =>
    (
      await apiFetcher.patch<PerformanceIsLikedResponse>(
        `/api/v1/performances/${performanceId}/favorites`,
        { isLiked }
      )
    ).data,

  getPerformanceDetail: async (performanceId: string) =>
    (
      await apiFetcher.get<PerformanceDetailResponse>(
        `/api/v1/performances/${performanceId}`
      )
    ).data,

  getPerformances: async (queryString: string) =>
    (
      await apiFetcher.get<PerformancesResponsePagination>(
        `/api/v1/performances?${queryString}`
      )
    ).data,
};
