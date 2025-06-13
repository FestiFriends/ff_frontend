import React from 'react';
import { CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

const MainPerformanceSkeletonCard = () =>
  Array.from({ length: 5 }).map((_, index) => (
    <CarouselItem
      key={index}
      className='basis-[150px] p-0'
    >
      <div className='flex w-[150px] flex-col gap-3'>
        <Skeleton className='h-[200px] w-[150px] rounded-[12px]' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-[19px] w-[150px]' />
          <Skeleton className='h-[17px] w-[150px]' />
        </div>
      </div>
    </CarouselItem>
  ));

export default MainPerformanceSkeletonCard;
