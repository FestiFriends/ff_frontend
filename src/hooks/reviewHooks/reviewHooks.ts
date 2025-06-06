import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { REVIEWS_QUERY_KEYS } from '@/constants/queryKeys';
import { reviewsApi } from '@/services/reviewsService';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  WritableReviewsResponse,
  WrittenReviewsResponse,
} from '@/types/reviews';

export const useInfiniteWrittenReviews = (size?: CursorRequest['size']) =>
  useInfiniteQuery<
    AxiosResponse<WrittenReviewsResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<WrittenReviewsResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [REVIEWS_QUERY_KEYS.reviews, REVIEWS_QUERY_KEYS.written],
    queryFn: ({ pageParam }) =>
      reviewsApi.getWrittenReviews({ cursorId: pageParam, size }),

    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });

export const useInfiniteWritableReviews = (size?: CursorRequest['size']) =>
  useInfiniteQuery<
    AxiosResponse<WritableReviewsResponse>,
    ApiResponse,
    InfiniteData<AxiosResponse<WritableReviewsResponse>>,
    string[],
    number | undefined
  >({
    queryKey: [REVIEWS_QUERY_KEYS.reviews, REVIEWS_QUERY_KEYS.writable],
    queryFn: ({ pageParam }) =>
      reviewsApi.getWritableReviews({ cursorId: pageParam, size }),

    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNext ? lastPage.data?.cursorId : undefined,
    initialPageParam: undefined,
  });
