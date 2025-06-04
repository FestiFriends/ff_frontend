import { useQuery } from '@tanstack/react-query';
import { PERFORMANCES_QUERY_KEYS } from '@/constants/queryKeys';
import { performancesApi } from '@/services/performancesService';

export const useGetTopFavoritesPerformances = () =>
  useQuery({
    queryKey: [
      PERFORMANCES_QUERY_KEYS.performances,
      PERFORMANCES_QUERY_KEYS.topFavorites,
    ],
    queryFn: performancesApi.getTopFavorites,
  });

export const useGetTopByGroupCountPerformances = () =>
  useQuery({
    queryKey: [
      PERFORMANCES_QUERY_KEYS.performances,
      PERFORMANCES_QUERY_KEYS.topByGroupCount,
    ],
    queryFn: performancesApi.getTopByGroupCount,
  });
