import apiFetcher from '@/lib/apiFetcher';
import { nextFetcher } from '@/lib/nextFetcher';
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
  patchLiked: async ({ performanceId, isLiked }: PerformanceIsLikedData) =>
    await apiFetcher.patch<PerformanceIsLikedResponse>(
      `/api/v1/performances/${performanceId}/favorites`,
      { isLiked }
    ),
  getPerformanceDetail: async (id: string) => {
    const res = await nextFetcher<PerformanceDetailResponse>(
      `/api/v1/performances/${id}`,
      { method: 'GET', revalidate: 21600 }
    );
    return res;
  },
};
