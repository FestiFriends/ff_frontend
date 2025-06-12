'use client';

import React from 'react';
import { useInfiniteWrittenReviews } from '@/hooks/reviewHooks/reviewHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';
import WrittenReviewsContent from './WrittenReviewsContent';

const WrittenReviews = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteWrittenReviews();
  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage
  );

  if (isPending) {
    return <ReviewCardSkeleton />;
  }

  return (
    <div className='flex flex-col items-center gap-5'>
      {data?.pages.map((page) =>
        page.data.data?.map((item) => (
          <ReviewCard
            key={item.groupId}
            groupInfo={item}
            reviewsCount={item.reviews.length}
            content={<WrittenReviewsContent reviews={item.reviews} />}
          />
        ))
      )}
      <>
        <div ref={bottomRef} />
        {isFetchingNextPage && <p>로딩 중...</p>}
      </>
    </div>
  );
};

export default WrittenReviews;
