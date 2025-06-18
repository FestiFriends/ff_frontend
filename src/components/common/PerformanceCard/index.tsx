'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PerformanceCardHeadless from '@/components/common/PerformanceCardHeadless';
import Toast from '@/components/common/Toast/Toast';
import LikeIcon from '@/components/icons/LikeIcon';
import { usePatchPerformanceLiked } from '@/hooks/performanceHooks/performanceHooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { Performance } from '@/types/performance';

interface PerformanceCardProps {
  performance: Performance;
  ranking?: number;
}

const { Image, LikeButton, Location, Root, Title } = PerformanceCardHeadless;

const PerformanceCard = ({ performance, ranking }: PerformanceCardProps) => {
  const isLoggedin = useAuthStore((state) => state.isLoggedin);
  const [showToast, setShowToast] = useState(false);
  const { mutate } = usePatchPerformanceLiked();
  const router = useRouter();

  const toggleLike = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }
    mutate({ performanceId: performance.id, isLiked: !performance.isLiked });
  };

  return (
    <>
      {showToast && (
        <Toast
          message='로그인이 필요합니다!'
          type='error'
          onClose={() => setShowToast(false)}
          className='bottom-4 left-1/2 -translate-x-1/2'
        />
      )}
      <Root
        onCardClick={() => router.push(`/performances/${performance.id}`)}
        onLikeClick={toggleLike}
        performance={performance}
        className='relative flex w-[150px] flex-col gap-3 border-0'
      >
        <LikeButton
          isLiked={performance.isLiked}
          icon={{
            liked: (
              <LikeIcon
                type='active'
                className='h-[30px] w-[30px] hover:opacity-80'
              />
            ),
            unLiked: (
              <LikeIcon
                type='emptyWhite'
                className='h-[30px] w-[30px] hover:opacity-80'
              />
            ),
          }}
          className='top-2.5 right-2.5 h-fit w-fit cursor-pointer bg-transparent hover:bg-transparent'
        />
        <div className='relative'>
          <Image className='h-[200px] w-[150px] rounded-[12px]' />
          <span className='absolute bottom-[13px] left-[17px] flex h-[38px] items-center text-32_B text-white'>
            {ranking}
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <Title className='mb-0 h-[19px] w-[150px] truncate !text-16_B text-gray-950' />
          <Location className='h-[17px] w-[150px] truncate to-gray-600 !text-14_M' />
        </div>
      </Root>
    </>
  );
};

export default PerformanceCard;
