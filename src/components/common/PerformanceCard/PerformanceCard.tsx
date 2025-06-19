'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PerformanceCardHeadless, Toast } from '@/components/common';
import { LikeIcon } from '@/components/icons';
import { usePatchPerformanceLiked } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { Performance } from '@/types/performance';

interface PerformanceCardProps {
  performance: Performance;
  ranking?: number;
  size?: 'fixed' | 'auto';
}

const PerformanceCard = ({
  performance,
  ranking,
  size = 'fixed',
}: PerformanceCardProps) => {
  const { Image, LikeButton, Location, Root, Title } = PerformanceCardHeadless;

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
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
        className={cn(
          'relative flex flex-col gap-3 border-0',
          size === 'fixed' ? 'w-[150px]' : 'w-full'
        )}
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
          <Image
            className={cn(
              'rounded-[12px]',
              size === 'fixed' ? 'h-[200px] w-[150px]' : 'aspect-[3/4] w-full'
            )}
          />
          <span className='absolute bottom-[13px] left-[17px] flex h-[38px] items-center text-32_B text-white'>
            {ranking}
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <Title
            className={cn(
              'mb-0 h-[19px] truncate !text-16_B text-gray-950',
              size === 'fixed' ? 'w-[150px]' : 'w-full'
            )}
          />
          <Location
            className={cn(
              'h-[17px] truncate to-gray-600 !text-14_M',
              size === 'fixed' ? 'w-[150px]' : 'w-full'
            )}
          />
        </div>
      </Root>
    </>
  );
};

export default PerformanceCard;
