import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const NotificationCardSkeleton = () => (
  <div className='flex flex-col gap-1'>
    <Skeleton className='h-5 w-full bg-gray-50' />
    <Skeleton className='h-5 w-full bg-gray-50' />
  </div>
);

export default NotificationCardSkeleton;
