import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ReviewCardSkeleton = () => (
  <div className='flex flex-col items-center gap-5'>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='flex h-[152px] w-[343px] gap-4 bg-gray-25 p-5'
      >
        <Skeleton className='h-[112px] w-[84px] shrink-0 overflow-hidden rounded-[12px] bg-gray-50' />
        <div className='flex w-[204px] flex-col justify-between'>
          <Skeleton className='h-4 w-full bg-gray-50' />
          <Skeleton className='h-[32px] w-full bg-gray-50' />
          <Skeleton className='h-[28px] w-full bg-gray-50' />
        </div>
      </div>
    ))}
  </div>
);

export default ReviewCardSkeleton;
