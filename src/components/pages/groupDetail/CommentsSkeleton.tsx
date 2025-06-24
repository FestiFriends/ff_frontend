import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CommentsSkeleton = () => (
  <div className='flex w-full flex-col items-center gap-5 pt-2'>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='flex h-[92px] w-full gap-2.5 rounded-2xl bg-gray-25 py-4'
      >
        <Skeleton className='h-10 w-10 rounded-full bg-gray-50' />
        <div className='flex flex-1 flex-col gap-1'>
          <Skeleton className='mb-1 h-[17px] w-11/12 bg-gray-50' />
          <Skeleton className='mb-2.5 h-4 w-11/12 bg-gray-50' />
          <Skeleton className='h-[17px] w-11/12 bg-gray-50' />
        </div>
      </div>
    ))}
  </div>
);

export default CommentsSkeleton;
