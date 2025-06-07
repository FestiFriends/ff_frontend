import { PERFORMANCES_QUERY_KEYS } from '@/constants/queryKeys';
import { performancesApi } from '@/services/performancesService';
import { ApiResponse } from '@/types/api';
import {
  Performance,
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
} from '@/types/performance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const usePatchPerformanceLiked = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PerformanceIsLikedResponse,
    ApiResponse,
    PerformanceIsLikedData
  >({
    mutationFn: async ({ performanceId, isLiked }) => {
      const response = await performancesApi.patchLiked({
        performanceId,
        isLiked,
      });
      return response.data;
    },
    onMutate: async ({ performanceId, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });

      const queries = queryClient.getQueriesData<{
        data: PerformancesResponse | ApiResponse<Performance>;
      }>({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });

      queries.forEach(([queryKey, queryData]) => {
        if (!queryData?.data) return;

        if (Array.isArray(queryData.data.data)) {
          queryClient.setQueryData(
            queryKey,
            (oldData: { data: PerformancesResponse }) => ({
              ...oldData,
              data: {
                ...oldData.data,
                data: oldData.data.data?.map((p) =>
                  p.id === performanceId
                    ? {
                        ...p,
                        isLiked,
                        favoriteCount: p.favoriteCount + (isLiked ? 1 : -1),
                      }
                    : p
                ),
              },
            })
          );
        } else {
          queryClient.setQueryData(
            queryKey,
            (oldData: ApiResponse<Performance>) => ({
              ...oldData,
              data: {
                ...oldData.data,
                isLiked,
                favoriteCount: oldData.data?.favoriteCount
                  ? oldData.data?.favoriteCount + (isLiked ? 1 : -1)
                  : oldData.data?.favoriteCount,
              },
            })
          );
        }
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });
    },
  });
};

export const useGetPerformanceDetail = (performanceId: string) =>
  useQuery({
    queryKey: [PERFORMANCES_QUERY_KEYS.performances, performanceId],
    queryFn: async () => {
      const res = await performancesApi.getPerformanceDetail(performanceId);
      return res.data;
    },
  });
