'use client';

import React, { useState } from 'react';
import {
  Image,
  LikeButton,
  Location,
  Root,
  Title,
} from '@/components/common/PerformanceCard/PerformanceCard';
import LikeIcon from '@/components/icons/LikeIcon';
import { Performance } from '@/types/performance';

interface PerformancesPerformanceCardProps {
  performance: Performance;
}

const PerformancesPerformanceCard = ({
  performance,
}: PerformancesPerformanceCardProps) => {
  const [isLike, setIsLike] = useState(performance.isLiked);
  return (
    <>
      <Root
        onCardClick={() => {}}
        onLikeClick={(p, l) => {
          console.log(p, l);
          setIsLike((pre) => !pre);
        }}
        performance={performance}
        className='relative flex w-[150px] flex-col gap-3 border-0'
      >
        <LikeButton
          isLiked={isLike}
          icon={{
            liked: (
              <LikeIcon
                type='active'
                className='h-[30px] w-[30px]'
              />
            ),
            unLiked: (
              <LikeIcon
                type='emptyWhite'
                className='h-[30px] w-[30px]'
              />
            ),
          }}
          className='top-2.5 right-2.5 h-fit w-fit bg-transparent'
        />
        <Image className='h-[200px] w-[150px] rounded-[12px]' />
        <div className='flex flex-col gap-2'>
          <Title className='mb-0 h-[19px] w-[150px] truncate !text-16_B text-gray-950' />
          <Location className='h-[17px] w-[150px] truncate to-gray-600 !text-14_M' />
        </div>
      </Root>
    </>
  );
};

export default PerformancesPerformanceCard;
