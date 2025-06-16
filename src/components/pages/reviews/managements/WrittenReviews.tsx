'use client';

import React from 'react';
import InfiniteList from '@/components/common/InfiniteList ';
import { infiniteWrittenReviewsOptions } from '@/hooks/reviewHooks/reviewHooks';
import { WrittenReviewsResponse } from '@/types/reviews';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';
import WrittenReviewsContent from './WrittenReviewsContent';

const WrittenReviews = () => (
  <InfiniteList<WrittenReviewsResponse, WrittenReviewsResponse['data'][number]>
    className='flex flex-col items-center gap-5'
    fallback={<ReviewCardSkeleton />}
    options={infiniteWrittenReviewsOptions()}
    getDataId={(data) => data.groupId}
    renderData={(data) => (
      <ReviewCard
        groupInfo={data}
        reviewsCount={data.reviews.length}
        content={<WrittenReviewsContent reviews={data.reviews} />}
      />
    )}
  />
);

export default WrittenReviews;
