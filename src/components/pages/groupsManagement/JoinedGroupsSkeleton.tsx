import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const JoinedGroupsSkeleton = () => (
  <div className='flex flex-col items-center gap-5 px-4'>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='flex h-[342px] w-full flex-col gap-3 rounded-2xl bg-gray-25 p-5'
      >
        <Skeleton className='h-3.5 w-full bg-gray-50' />
        <div className='flex w-full justify-between gap-4'>
          <Skeleton className='h-[136px] w-[102px] shrink-0 overflow-hidden rounded-12 bg-gray-50' />
          <div className='flex-1 flex-col'>
            <div className='mb-2.5 flex flex-1 flex-col gap-1.5'>
              <Skeleton className='h-3.5 w-full bg-gray-50' />
              <Skeleton className='h-[19px] w-full bg-gray-50' />
              <Skeleton className='h-4 w-full bg-gray-50' />
            </div>
            <Skeleton className='mb-1 h-4 w-full bg-gray-50' />
            <Skeleton className='h-11 w-full bg-gray-50' />
          </div>
        </div>
        <div className='flex flex-col gap-2.5'>
          <Skeleton className='h-[26px] w-full bg-gray-50' />
          <Skeleton className='h-[30px] w-full bg-gray-50' />
        </div>
        <Skeleton className='h-[42px] w-full bg-gray-50' />
      </div>
    ))}
  </div>
);

export default JoinedGroupsSkeleton;
