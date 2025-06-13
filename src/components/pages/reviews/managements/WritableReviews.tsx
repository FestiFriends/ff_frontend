'use client';

import React from 'react';
import InfiniteReviewList from '@/components/common/InfiniteReviewList';
import { infiniteWritableReviewsOptions } from '@/hooks/reviewHooks/reviewHooks';
import { WritableReviewsResponse } from '@/types/reviews';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';
import WritableReviewsContent from './WritableReviewsContent';

const WritableReviews = () => (
  <InfiniteReviewList<
    WritableReviewsResponse,
    WritableReviewsResponse['data'][number]
  >
    fallback={<ReviewCardSkeleton />}
    options={infiniteWritableReviewsOptions(2)}
    getDataId={(data) => data.groupId}
    renderData={(data) => (
      <ReviewCard
        groupInfo={data}
        reviewsCount={data.memberCount - data.reviews.length}
        content={
          <WritableReviewsContent
            reviews={data.reviews}
            groupId={data.groupId}
          />
        }
      />
    )}
  />
);

export default WritableReviews;
