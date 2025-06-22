'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  GroupCategoryIconLabels,
  GroupCategoryLabels,
} from '@/constants/groupLabels';
import { cn } from '@/lib/utils';
import { ApplicationGroupInfo } from '@/types/application';
import { ReviewGroupInfo } from '@/types/reviews';
import ProgressBar from '../ProgressBar/ProgressBar';

interface BaseProps {
  content?: ReactNode;
  className?: string;
  onCardClick?: () => void;
}

interface ReviewCardProps extends BaseProps {
  type: 'review';
  reviewsCount: number;
  groupInfo: ReviewGroupInfo & { memberCount: number };
}

interface ApplicationCardProps extends BaseProps {
  type: 'application';
  groupInfo: ApplicationGroupInfo;
}

type SlideCardProps = ReviewCardProps | ApplicationCardProps;

const SlideCard = (props: SlideCardProps) => {
  const { type, groupInfo, content, onCardClick } = props;
  const [open, setOpen] = useState(false);
  const [openToClose, setOpenToClose] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      const measured = contentRef.current.scrollHeight;
      setContentHeight(Math.min(measured, 220));
    } else {
      setContentHeight(0);
    }
  }, [open, content]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (open) {
      setOpenToClose(true);
      setOpen(false);
      setTimeout(() => {
        setOpenToClose(false);
      }, 300);
    } else {
      setOpen(true);
    }
  };

  const Icon = GroupCategoryIconLabels[groupInfo.category];

  return (
    <div
      {...(type === 'application' && {
        onClick: onCardClick,
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onCardClick?.();
          }
        },
      })}
      className={cn(
        'flex w-full flex-col rounded-2xl bg-gray-25 p-5',
        (open || openToClose) && 'gap-4'
      )}
    >
      <div className='flex gap-4'>
        <div className='relative h-[112px] w-[84px] shrink-0 overflow-hidden rounded-[12px]'>
          <Image
            src={groupInfo.performance.poster}
            alt={groupInfo.performance.title}
            width={84}
            height={112}
            sizes='84px'
            className='object-cover'
          />
        </div>

        <div className='flex w-full flex-1 flex-col justify-between overflow-hidden'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-1 text-14_M text-gray-600'>
              {<Icon className='h-4 w-4' />}
              {GroupCategoryLabels[groupInfo.category]}
            </span>

            <p className='text-12_M text-gray-600'>
              {format(
                type === 'review'
                  ? groupInfo.groupStartDate
                  : groupInfo.startDate,
                'yy.MM.dd'
              )}{' '}
              ~{' '}
              {format(
                type === 'review' ? groupInfo.groupEndDate : groupInfo.endDate,
                'yy.MM.dd',
                { locale: ko }
              )}
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
                {type === 'review'
                  ? `멤버 (${groupInfo.memberCount}명)`
                  : `모집 인원 (${groupInfo.memberCount}/${groupInfo.maxMembers}명)`}
              </p>
              <button
                className='text-12_M text-gray-700 underline'
                onClick={(e) => handleOpen(e)}
              >
                <span>{open ? '닫기' : '더보기'}</span>
              </button>
            </div>

            <ProgressBar
              current={
                type === 'review' ? props.reviewsCount : groupInfo.memberCount
              }
              total={
                type === 'review' ? groupInfo.memberCount : groupInfo.maxMembers
              }
              showInfo={false}
            />
          </div>
        </div>
      </div>

      <ScrollArea
        className={cn(
          'transition-all duration-300',
          !open && 'h-0 overflow-hidden'
        )}
        style={{ height: contentHeight }}
      >
        <div ref={contentRef}>{content}</div>
      </ScrollArea>
    </div>
  );
};

export default SlideCard;
