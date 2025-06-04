import apiFetcher from '@/lib/apiFetcher';
import { PerformancesResponse } from '@/types/performance';

export const performancesApi = {
  getTopFavorites: async () =>
    await apiFetcher.get<PerformancesResponse>(
      '/api/v1/performances/top-favorites'
    ),
  getTopByGroupCount: async () =>
    await apiFetcher.get<PerformancesResponse>(
      '/api/v1/performances/top-groups'
    ),
};
