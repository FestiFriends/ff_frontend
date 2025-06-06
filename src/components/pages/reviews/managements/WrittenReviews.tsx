'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useInfiniteWrittenReviews } from '@/hooks/reviewHooks/reviewHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import ReviewCard from './ReviewCard';
import WrittenReviewsContent from './WrittenReviewsContent';

const WrittenReviews = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteWrittenReviews(2);
  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage
  );

  if (isPending) {
    return (
      <div className='flex flex-col gap-1'>
        <Skeleton className='h-5 w-full bg-gray-50' />
        <Skeleton className='h-5 w-full bg-gray-50' />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-2'>
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
