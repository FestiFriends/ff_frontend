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
  type?: 'card' | 'listItem';
}

const PerformanceCard = ({
  performance,
  ranking,
  size = 'fixed',
  type = 'card',
}: PerformanceCardProps) => {
  const { Image, LikeButton, Location, Root, Title, Cast } =
    PerformanceCardHeadless;

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

  const Card = () => (
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
  );

  const ListItem = () => (
    <Root
      onCardClick={() => router.push(`/performances/${performance.id}`)}
      onLikeClick={toggleLike}
      performance={performance}
      className='relative flex w-full items-center rounded-lg border-0 bg-gray-25 p-5'
    >
      <div className='flex h-[80px] w-full gap-4'>
        <div className='relative h-full flex-shrink-0'>
          <Image className='h-full w-full rounded-[8px] object-cover' />
        </div>

        <div className='flex h-full min-w-0 flex-1 flex-col justify-between gap-3.5 py-1'>
          <div className='flex min-w-0 flex-col gap-2'>
            <Title className='min-w-0 truncate !text-16_B text-gray-950' />
            <Location className='min-w-0 truncate !text-13_M text-gray-600' />
          </div>
          <Cast className='min-w-0 truncate !text-14_M text-gray-600' />
        </div>
      </div>

      <LikeButton
        isLiked={performance.isLiked}
        icon={{
          liked: (
            <LikeIcon
              type='active'
              className='h-[24px] w-[24px] hover:opacity-80'
            />
          ),
          unLiked: (
            <LikeIcon
              type='empty'
              className='h-[24px] w-[24px] hover:opacity-80'
            />
          ),
        }}
        className='h-fit w-fit flex-shrink-0 cursor-pointer bg-transparent hover:bg-transparent'
      />
    </Root>
  );

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
      {type === 'card' && <Card />}
      {type === 'listItem' && <ListItem />}
    </>
  );
};

export default PerformanceCard;
