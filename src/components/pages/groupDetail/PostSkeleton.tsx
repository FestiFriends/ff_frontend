import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PostSkeleton = () => (
  <div className='flex w-full justify-center'>
    <div className='flex h-[181px] w-full flex-col gap-3 rounded-2xl bg-gray-25 px-6 pt-6 pb-2.5'>
      <Skeleton className='mb-3.5 h-10 w-full bg-gray-50' />
      <Skeleton className='mb-5 h-[29px] w-full bg-gray-50' />
      <Skeleton className='h-11 w-full bg-gray-50' />
    </div>
  </div>
);

export default PostSkeleton;
