import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse, CursorRequest } from '@/types/api';
import {
  PostReviewRequest,
  ReviewListResponse,
  WritableReviewsResponse,
  WrittenReviewsResponse,
} from '@/types/reviews';

export const reviewsApi = {
  getWrittenReviews: async ({ cursorId, size = 20 }: CursorRequest) =>
    (
      await apiFetcher.get<WrittenReviewsResponse>('/api/v1/reviews/written', {
        params: { cursorId, size },
      })
    ).data,

  getWritableReviews: async ({ cursorId, size = 20 }: CursorRequest) =>
    (
      await apiFetcher.get<WritableReviewsResponse>(
        '/api/v1/reviews/writable',
        {
          params: { cursorId, size },
        }
      )
    ).data,

  postWriteReview: async (data: PostReviewRequest) =>
    await apiFetcher.post<ApiResponse, ApiResponse, PostReviewRequest>(
      '/api/v1/reviews',
      data
    ),

  getReceivedSimpleReviews: async ({
    cursorId,
    size = 20,
    userId,
  }: CursorRequest & { userId: string }) =>
    (
      await apiFetcher.get<ReviewListResponse>(`/api/v1/reviews/${userId}`, {
        params: { cursorId, size },
      })
    ).data,
};
