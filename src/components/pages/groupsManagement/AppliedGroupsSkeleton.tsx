import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AppliedGroupsSkeleton = () => (
  <div className='flex flex-col items-center gap-5 px-4'>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='rounded-4 flex h-[272px] w-full flex-col gap-4 bg-gray-25 p-5'
      >
        <Skeleton className='h-[17px] w-full bg-gray-50' />
        <div className='flex w-full justify-between gap-4'>
          <Skeleton className='h-[136px] w-[102px] shrink-0 overflow-hidden rounded-12 bg-gray-50' />
          <div className='flex-1 flex-col'>
            <Skeleton className='mb-1.5 h-[19px] w-full bg-gray-50' />
            <Skeleton className='mb-4 h-4 w-full bg-gray-50' />
            <Skeleton className='mb-2 h-3.5 w-full bg-gray-50' />
            <Skeleton className='h-14 w-full bg-gray-50' />
          </div>
        </div>
        <Skeleton className='h-[62px] w-full bg-gray-50' />
      </div>
    ))}
  </div>
);

export default AppliedGroupsSkeleton;
