import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ReviewCardSkeleton = () => (
  <div className='flex flex-col items-center gap-5'>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='flex h-[166px] w-full gap-4 rounded-2xl bg-gray-25 p-5'
      >
        <Skeleton className='h-[126px] w-[84px] shrink-0 overflow-hidden rounded-12 bg-gray-50' />
        <div className='flex flex-1 flex-col justify-between'>
          <Skeleton className='h-[17px] w-full bg-gray-50' />
          <div className='flex flex-col gap-1.5'>
            <Skeleton className='h-3.5 w-full bg-gray-50' />
            <Skeleton className='h-[19px] w-full bg-gray-50' />
          </div>
          <Skeleton className='h-[28px] w-full bg-gray-50' />
        </div>
      </div>
    ))}
  </div>
);

export default ReviewCardSkeleton;
