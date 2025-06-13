'use client';

import React from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import {
  InfiniteData,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';
import { infiniteWrittenReviewsOptions } from '@/hooks/reviewHooks/reviewHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { ApiResponse } from '@/types/api';
import { WrittenReviewsResponse } from '@/types/reviews';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';
import WrittenReviewsContent from './WrittenReviewsContent';

const ReviewList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseSuspenseInfiniteQueryResult<
  InfiniteData<WrittenReviewsResponse>,
  ApiResponse
>) => {
  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage
  );

  return (
    <div className='flex flex-col items-center gap-5'>
      {data.pages.map((page) =>
        page.data?.map((item) => (
          <ReviewCard
            key={item.groupId}
            groupInfo={item}
            reviewsCount={item.reviews.length}
            content={<WrittenReviewsContent reviews={item.reviews} />}
          />
        ))
      )}
      <div ref={bottomRef} />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </div>
  );
};

const WrittenReviews = () => (
  <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
    <Suspense fallback={<ReviewCardSkeleton />}>
      <SuspenseInfiniteQuery {...infiniteWrittenReviewsOptions(1)}>
        {(props) => <ReviewList {...props} />}
      </SuspenseInfiniteQuery>
    </Suspense>
  </ErrorBoundary>
);

export default WrittenReviews;
