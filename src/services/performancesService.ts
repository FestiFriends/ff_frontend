import axiosFetcher from '@/lib/axiosFetcher';
import { PerformancesResponse } from '@/types/performances';

export const performancesApi = {
  getTopFavorites: async () =>
    await axiosFetcher.get<PerformancesResponse>(
      '/api/v1/performances/top-favorites'
    ),
  getTopByGroupCount: async () =>
    await axiosFetcher.get<PerformancesResponse>(
      '/api/v1/performances/top-groups'
    ),
};
