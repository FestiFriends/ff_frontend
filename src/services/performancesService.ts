import apiFetcher from '@/lib/apiFetcher';
import { CursorRequest } from '@/types/api';
import {
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
  PerformanceDetailResponse,
  PerformancesResponsePagination,
  GetFavoritePerformancesResponse,
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

  getFavoritePerformances: async ({ cursorId, size = 10 }: CursorRequest) =>
    await apiFetcher.get<GetFavoritePerformancesResponse>(
      '/api/v1/performances/favorites',
      { params: { cursorId, size } }
    ),

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
