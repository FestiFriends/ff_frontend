import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { PERFORMANCES_QUERY_KEYS } from '@/constants/queryKeys';
import { performancesApi } from '@/services/performancesService';
import { ApiResponse } from '@/types/api';
import {
  GetFavoritePerformancesResponse,
  PerformanceDetailResponse,
  PerformanceIsLikedData,
  PerformanceIsLikedResponse,
  PerformancesResponse,
  PerformancesResponsePagination,
} from '@/types/performance';

export const getTopFavoritesQueryOptions = () => ({
  queryKey: [
    PERFORMANCES_QUERY_KEYS.performances,
    PERFORMANCES_QUERY_KEYS.topFavorites,
  ],
  queryFn: performancesApi.getTopFavorites,
});

export const getTopByGroupCountQueryOptions = () => ({
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
    mutationFn: async ({ performanceId, isLiked }) =>
      await performancesApi.patchLiked({
        performanceId,
        isLiked,
      }),
    onMutate: async ({ performanceId, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });

      const queries = queryClient.getQueriesData<
        PerformancesResponse | PerformanceDetailResponse
      >({
        queryKey: [PERFORMANCES_QUERY_KEYS.performances],
      });

      queries.forEach(([queryKey, queryData]) => {
        if (!queryData?.data) return;

        if (Array.isArray(queryData.data)) {
          queryClient.setQueryData(
            queryKey,
            (oldData: PerformancesResponse) => ({
              ...oldData,
              data: oldData.data?.map((p) =>
                p.id === performanceId
                  ? {
                      ...p,
                      isLiked,
                      favoriteCount: p.favoriteCount + (isLiked ? 1 : -1),
                    }
                  : p
              ),
            })
          );
        } else {
          queryClient.setQueryData(
            queryKey,
            (oldData: PerformanceDetailResponse) => ({
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

      const queryData = queryClient.getQueryData<
        InfiniteData<GetFavoritePerformancesResponse>
      >([PERFORMANCES_QUERY_KEYS.favoritesPerformances]);

      if (!queryData) return;

      const newData: InfiniteData<GetFavoritePerformancesResponse> = {
        ...queryData,
        pages: queryData.pages.map((page) => ({
          ...page,
          data: page.data.map((p) =>
            p.id === performanceId
              ? {
                  ...p,
                  isLiked,
                  favoriteCount: p.favoriteCount + (isLiked ? 1 : -1),
                }
              : p
          ),
        })),
      };

      queryClient.setQueryData(
        [PERFORMANCES_QUERY_KEYS.favoritesPerformances],
        newData
      );
    },

    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [PERFORMANCES_QUERY_KEYS.favoritesPerformances],
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
    queryFn: async () =>
      await performancesApi.getPerformanceDetail(performanceId),
  });

export const useGetPerformances = (queryString: string, enabled?: boolean) =>
  useQuery<PerformancesResponsePagination>({
    queryKey: [PERFORMANCES_QUERY_KEYS.performances, queryString],
    queryFn: async () => await performancesApi.getPerformances(queryString),
    enabled,
  });
