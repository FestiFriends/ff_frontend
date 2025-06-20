import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const NotificationCardSkeleton = () => (
  <>
    {[1, 2, 3, 4].map((v) => (
      <div
        key={v}
        className='flex h-[120px] w-full flex-col justify-between p-4'
      >
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-full bg-gray-50' />
          <Skeleton className='h-5 w-full bg-gray-50' />
        </div>
        <div className='flex h-6 justify-end gap-2'>
          <Skeleton className='w-11 rounded-[4px] bg-gray-50' />
          <Skeleton className='w-11 rounded-[4px] bg-gray-50' />
        </div>
      </div>
    ))}
  </>
);

export default NotificationCardSkeleton;
