import {
  InfiniteData,
  useMutation,
  useQueryClient,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { REVIEWS_QUERY_KEYS } from '@/constants/queryKeys';
import { reviewsApi } from '@/services/reviewsService';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  PostReviewRequest,
  WritableReviewsData,
  WritableReviewsResponse,
  WrittenReviewsResponse,
} from '@/types/reviews';

export const infiniteWrittenReviewsOptions = (
  size?: CursorRequest['size']
): UseSuspenseInfiniteQueryOptions<
  WrittenReviewsResponse,
  ApiResponse,
  InfiniteData<WrittenReviewsResponse>,
  WrittenReviewsResponse,
  string[],
  number | undefined
> => ({
  queryKey: [REVIEWS_QUERY_KEYS.reviews, REVIEWS_QUERY_KEYS.written],
  queryFn: ({ pageParam }) =>
    reviewsApi.getWrittenReviews({ cursorId: pageParam, size }),

  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
  initialPageParam: undefined,
});

export const infiniteWritableReviewsOptions = (
  size?: CursorRequest['size']
): UseSuspenseInfiniteQueryOptions<
  WritableReviewsResponse,
  ApiResponse,
  InfiniteData<WritableReviewsResponse>,
  WritableReviewsResponse,
  string[],
  number | undefined
> => ({
  queryKey: [REVIEWS_QUERY_KEYS.reviews, REVIEWS_QUERY_KEYS.writable],
  queryFn: ({ pageParam }) =>
    reviewsApi.getWritableReviews({ cursorId: pageParam, size }),

  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.cursorId : undefined,
  initialPageParam: undefined,
});

export const usePostWriteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiResponse, PostReviewRequest>({
    mutationFn: reviewsApi.postWriteReview,
    onSuccess: (_, variables) => {
      const queryKey = [
        REVIEWS_QUERY_KEYS.reviews,
        REVIEWS_QUERY_KEYS.writable,
      ];

      queryClient.setQueryData(
        queryKey,
        (oldData: InfiniteData<AxiosResponse<WritableReviewsResponse>>) => {
          if (!oldData) return oldData;

          const newPages = oldData.pages.map((page) => {
            const updatedGroups = page.data.data
              ?.map((group: WritableReviewsData) => {
                const filteredReviews = group.reviews.filter(
                  (r) => r.targetUserId !== variables.targetUserId
                );

                if (filteredReviews.length === 0) return null;

                return {
                  ...group,
                  reviews: filteredReviews,
                };
              })
              .filter((group) => group !== null);

            return {
              ...page,
              data: {
                ...page.data,
                data: updatedGroups,
              },
            };
          });

          return {
            ...oldData,
            pages: newPages,
          };
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY_KEYS.reviews] });
    },
  });
};
