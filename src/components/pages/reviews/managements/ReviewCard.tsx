'use client';

import React, { ReactNode, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import {
  GroupCategoryIconLabels,
  GroupCategoryLabels,
} from '@/constants/groupLabels';
import { cn } from '@/lib/utils';
import { ReviewGroupInfo } from '@/types/reviews';

interface ReviewCardProps {
  groupInfo: ReviewGroupInfo & { memberCount: number };
  reviewsCount: number;
  content: ReactNode;
}

const ReviewCard = ({ groupInfo, reviewsCount, content }: ReviewCardProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((pre) => !pre);
  };

  const Icon = GroupCategoryIconLabels[groupInfo.category];

  return (
    <div
      className={cn(
        'flex w-[343px] flex-col rounded-2xl bg-gray-25 p-5',
        open && 'gap-4'
      )}
    >
      <div className='flex gap-4'>
        <div className='relative h-[112px] w-[84px] shrink-0 overflow-hidden rounded-[12px]'>
          <Image
            src={groupInfo.performance.poster}
            alt={groupInfo.performance.title}
            fill
            className='object-cover'
          />
        </div>

        <div className='flex w-[204px] flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-1 text-14_M text-gray-600'>
              {<Icon className='h-4 w-4' />}
              {GroupCategoryLabels[groupInfo.category]}
            </span>

            <p className='text-12_M text-gray-600'>
              {format(groupInfo.groupStartDate, 'yy.MM.dd')} ~{' '}
              {format(groupInfo.groupEndDate, 'yy.MM.dd', { locale: ko })}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='truncate text-12_B text-gray-950'>
              {groupInfo.performance.title}
            </h2>
            <h1 className='truncate text-16_B text-gray-950'>
              {groupInfo.groupTitle}
            </h1>
          </div>

          <div className='flex flex-col gap-2.5'>
            <div className='flex items-center justify-between'>
              <p className='text-14_M text-gray-700'>
                멤버 ({groupInfo.memberCount}명)
              </p>
              <button
                className='text-12_M text-gray-700 underline'
                onClick={handleOpen}
              >
                <span>{open ? '닫기' : '더보기'}</span>
              </button>
            </div>

            <ProgressBar
              current={reviewsCount}
              total={groupInfo.memberCount}
              showInfo={false}
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          'overflow-y-scroll transition-all duration-300',
          open ? 'max-h-dvh' : 'max-h-0'
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ReviewCard;
