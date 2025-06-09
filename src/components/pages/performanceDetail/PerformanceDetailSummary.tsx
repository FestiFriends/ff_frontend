'use client';

import React, { useMemo, useState } from 'react';
import Poster from '@/components/common/poster/Poster';
import Toast from '@/components/common/Toast/Toast';
import LikeIcon from '@/components/icons/LikeIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { usePatchPerformanceLiked } from '@/hooks/performanceHooks/performanceHooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { Performance } from '@/types/performance';
import { formatLocation } from '@/utils/formatLocation';

interface PerformanceDetailSummaryProps {
  isPending: boolean;
  performanceDetail?: Performance;
}

type InfoItem = {
  label: string;
  value: React.ReactNode;
};

const PerformanceDetailSummary = ({
  isPending,
  performanceDetail,
}: PerformanceDetailSummaryProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedin);
  const [showToast, setShowToast] = useState(false);
  const [isLiked, setIsLiked] = useState(performanceDetail?.isLiked);
  const { mutate } = usePatchPerformanceLiked();
  const { location, place } = formatLocation(performanceDetail?.location);

  const toggleLike = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }
    if (!performanceDetail) return;
    setIsLiked((prev) => !prev);
    mutate({
      performanceId: performanceDetail.id,
      isLiked: !performanceDetail.isLiked,
    });
  };

  const performanceInfoList: InfoItem[] = useMemo(() => {
    if (!performanceDetail) return [];

    return [
      {
        label: '기간',
        value: `${format(performanceDetail.startDate, 'yy.MM.dd')} ~ ${format(performanceDetail.endDate, 'yy.MM.dd')}`,
      },
      {
        label: '지역',
        value: location,
      },
      {
        label: '공연 장소',
        value: place,
      },
      {
        label: '출연진',
        value: (
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
        ),
      },
      {
        label: '제작진',
        value: performanceDetail.crew?.join(', '),
      },
      { label: '공연 시간', value: performanceDetail.runtime },
      { label: '기획사', value: performanceDetail.agency },
      {
        label: '티켓 가격',
        value: performanceDetail.price.map((price: string) => (
          <p key={price}>{price}</p>
        )),
      },
      { label: '연령', value: performanceDetail.age },
    ];
  }, [performanceDetail, location, place]);

  const renderPerformanceInfoList = () => (
    <div
      className='grid gap-y-3'
      style={{ gridTemplateColumns: 'max-content 1fr' }}
    >
      {performanceInfoList.map(({ label, value }) => (
        <React.Fragment key={label}>
          <span className='pr-7.5 text-16_B leading-normal tracking-[-0.4px] whitespace-nowrap text-gray-700'>
            {label}
          </span>
          <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-700'>
            {value}
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  if (isPending)
    return (
      <div className='flex flex-col gap-5 bg-white px-4 pt-5 pb-7.5'>
        <Skeleton className='h-[60vh] w-full' />
        <div className='flex flex-col gap-5'>
          <Skeleton className='h-6 w-full' />
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-4 w-[60vw]' />
            <Skeleton className='h-4 w-[45vw]' />
            <Skeleton className='h-4 w-[70vw]' />
          </div>
        </div>
      </div>
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

      <div className='flex flex-col gap-5 bg-white px-4 pt-5 pb-7.5'>
        {/* 공연 포스터 */}

        <Poster
          src={performanceDetail?.poster || ''}
          alt={performanceDetail?.title}
          className='aspect-[2/3] h-auto max-h-[60vh] w-full'
        />

        <div className='flex flex-col gap-5'>
          {/* 공연명, 찜, 공유 */}
          <div className='flex items-center justify-between'>
            <h2 className='text-18_B leading-normal tracking-[-0.45px] text-gray-950'>
              {performanceDetail?.title}
            </h2>
            <div className='flex items-center gap-3'>
              <button
                onClick={toggleLike}
                aria-label='찜 버튼'
                className='flex h-7.5 items-center justify-center gap-1 rounded-full bg-gray-25 p-3'
              >
                <LikeIcon type={isLiked ? 'active' : 'empty'} />
                <span className='text-14_M leading-normal tracking-[-0.35px] text-gray-950 select-none'>
                  {performanceDetail?.favoriteCount}
                </span>
              </button>
              {/* <button
                aria-label='공유 버튼'
                className='flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-25'
              >
                <ShareIcon />
              </button> */}
            </div>
          </div>

          {/* 공연 정보 요약 */}
          {renderPerformanceInfoList()}
        </div>
      </div>
    </>
  );
};
export default PerformanceDetailSummary;
