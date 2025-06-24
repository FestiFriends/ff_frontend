'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import Toast from '@/components/common/Toast/Toast';
import LikeIcon from '@/components/icons/LikeIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { usePatchPerformanceLiked } from '@/hooks/performanceHooks/performanceHooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { Performance } from '@/types/performance';
import { formatLocation } from '@/utils/formatLocation';

interface PerformanceDetailSummaryProps {
  isPending: boolean;
  performanceDetail?: Performance;
}

const PerformanceDetailSummary = ({
  isPending,
  performanceDetail,
}: PerformanceDetailSummaryProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [showToast, setShowToast] = useState(false);
  const { mutate } = usePatchPerformanceLiked();
  const imageWidth = 500;
  const imageHeight = 700;

  if (isPending || !performanceDetail)
    return (
      <div className='flex flex-col gap-5 bg-white px-4 pt-5 pb-7.5'>
        <Skeleton className='h-[60dvh] w-full' />
        <div className='flex flex-col gap-5'>
          <Skeleton className='h-8 w-full' />
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-6 w-[50%]' />
            <Skeleton className='h-6 w-[80%]' />
            <Skeleton className='h-6 w-[70%]' />
          </div>
        </div>
      </div>
    );

  const toggleLike = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }
    mutate({
      performanceId: performanceDetail.id,
      isLiked: !performanceDetail.isLiked,
    });
  };

  return (
    <>
      {showToast && (
        <Toast
          message='로그인이 필요합니다!'
          type='error'
          onClose={() => setShowToast(false)}
        />
      )}

      <div className='flex flex-col gap-5 bg-white px-4 pt-5 pb-7.5'>
        {/* 공연 포스터 */}
        <div>
          <div className='flex max-h-[65dvh] justify-center'>
            <Image
              src={performanceDetail.poster || ''}
              alt={performanceDetail.title || ''}
              width={imageWidth}
              height={imageHeight}
              sizes={`${imageWidth}px`}
              className='rounded-[12px] object-contain'
              priority
            />
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            {/* 공연명 */}
            <h2 className='text-18_B leading-normal tracking-[-0.45px] break-keep text-gray-950'>
              {performanceDetail.title}
            </h2>
            {/* 공연 찜 */}
            <div className='flex items-center gap-3'>
              <button
                onClick={toggleLike}
                aria-label='찜 버튼'
                className='flex h-7.5 items-center justify-center gap-1 rounded-full bg-gray-25 p-3'
              >
                <LikeIcon
                  type={performanceDetail.isLiked ? 'active' : 'empty'}
                />
                <span className='text-14_M leading-normal tracking-[-0.35px] text-gray-950 select-none'>
                  {performanceDetail.favoriteCount}
                </span>
              </button>
            </div>
          </div>

          {/* 공연 정보 요약 */}
          <div
            className='grid gap-y-3'
            style={{ gridTemplateColumns: 'max-content 1fr' }}
          >
            <span className='pr-7.5 text-16_B leading-normal tracking-[-0.4px] whitespace-nowrap text-gray-700'>
              기간
            </span>
            <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-700'>
              {!performanceDetail.startDate || !performanceDetail.endDate
                ? '정보 없음'
                : `${format(performanceDetail.startDate, 'yy.MM.dd')} ~ ${format(performanceDetail.endDate, 'yy.MM.dd')}`}
            </span>

            <span className='pr-7.5 text-16_B leading-normal tracking-[-0.4px] whitespace-nowrap text-gray-700'>
              장소
            </span>
            <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-700'>
              {formatLocation(performanceDetail.location).place}
            </span>

            <span className='pr-7.5 text-16_B leading-normal tracking-[-0.4px] whitespace-nowrap text-gray-700'>
              출연진
            </span>
            <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-700'>
              {performanceDetail.cast.length === 0 ? (
                '정보 없음'
              ) : (
                <div className='flex flex-wrap items-center gap-x-1'>
                  {performanceDetail.cast.map((cast: string) => (
                    <span
                      className='underline decoration-solid [text-decoration-thickness:auto] [text-underline-offset:auto] [text-decoration-skip-ink:none] [text-underline-position:from-font]'
                      key={cast}
                    >
                      {cast}
                    </span>
                  ))}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default PerformanceDetailSummary;
