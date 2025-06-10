'use client';

import React, { ReactNode, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import Image from 'next/image';
import { GroupCategoryLabels } from '@/constants/groupLabels';
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

  return (
    <div className='flex w-[344px] flex-col gap-4 rounded-2xl bg-gray-25 p-5'>
      <div className='flex gap-4'>
        <div className='relative h-[112px] w-[84px] shrink-0 overflow-hidden rounded-[12px]'>
          <Image
            src={groupInfo.performance.poster}
            alt={groupInfo.performance.title}
            fill
            className='object-cover'
          />
        </div>

        <div className='flex w-[204px] flex-col gap-2 py-1.5'>
          <span className='text-14_M text-gray-600'>
            {GroupCategoryLabels[groupInfo.category]}
          </span>
          <h2 className='truncate text-14_B text-gray-700'>
            {groupInfo.performance.title}
          </h2>
          <h1 className='truncate text-16_B'>{groupInfo.groupTitle}</h1>

          <p className='text-12_M text-gray-600'>
            {format(groupInfo.groupStartDate, 'yy.MM.dd')} ~{' '}
            {format(groupInfo.groupEndDate, 'yy.MM.dd', { locale: ko })}
          </p>
          <p className='text-12_M text-gray-600'>
            {reviewsCount}/{groupInfo.memberCount}
          </p>
        </div>
      </div>

      <button
        className='flex w-full justify-center gap-2'
        onClick={handleOpen}
      >
        <span>{open ? '닫기' : '열기'}</span>
        {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </button>

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
