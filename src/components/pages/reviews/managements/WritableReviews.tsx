'use client';

import React from 'react';
import InfiniteList from '@/components/common/InfiniteList/InfiniteList ';
import SlideCard from '@/components/common/SlideCard/SlideCard';
import { infiniteWritableReviewsOptions } from '@/hooks/reviewHooks/reviewHooks';
import { WritableReviewsResponse } from '@/types/reviews';
import ReviewCardSkeleton from './ReviewCardSkeleton';
import WritableReviewsContent from './WritableReviewsContent';

const WritableReviews = () => (
  <InfiniteList<
    WritableReviewsResponse,
    WritableReviewsResponse['data'][number]
  >
    className='flex flex-col items-center gap-5'
    fallback={<ReviewCardSkeleton />}
    options={infiniteWritableReviewsOptions()}
    getDataId={(data) => data.groupId}
    renderData={(data) => (
      <SlideCard
        type='review'
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
