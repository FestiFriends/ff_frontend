'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Badge from '@/components/common/Badge/Badge';
import { badgeStyles } from '@/components/common/Badge/Badge.styles';
import Button from '@/components/common/Button/Button';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import StarIcon from '@/components/icons/StarIcon';
import { ApplicationStatusLabels } from '@/constants/applicationLabels';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { cn } from '@/lib/utils';
import { AppliedGroup } from '@/types/application';
import { GroupCategory, GroupCategoryType } from '@/types/enums';

interface ApplicationCardProps {
  applicationData: AppliedGroup;
  className?: string;
  onCardClick?: () => void;
  primaryButtonText: string;
  onPrimaryClick: () => void;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
}

const DATE_FORMAT = 'yy.MM.dd';

const ApplicationCard = ({
  applicationData,
  className,
  onCardClick,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
}: ApplicationCardProps) => {
  const genderLabel = GenderLabels[applicationData.gender];

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      !onCardClick
      || ('target' in e && (e.target as HTMLElement).closest('button'))
    ) {
      return;
    }
    onCardClick();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
  };

  const handlePrimaryClick = () => {
    onPrimaryClick();
  };
  return (
    <div
      role='button'
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e);
        }
      }}
      className={cn(
        'flex w-full flex-col items-start justify-center gap-4 rounded-2xl bg-gray-25 p-5',
        className
      )}
    >
      {/* 카테고리, 날짜 */}
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-2'>
          {applicationData.status && (
            <Badge
              label={ApplicationStatusLabels[applicationData.status]}
              className={badgeStyles.status[applicationData.status]}
            />
          )}
          {applicationData.category && (
            <Badge
              label={GroupCategoryLabels[applicationData.category]}
              className={
                badgeStyles.category[
                  GroupCategory[applicationData.category as GroupCategoryType]
                ]
              }
            />
          )}
        </div>
        <span className='text-12_M text-gray-600'>
          {format(new Date(applicationData.createdAt), DATE_FORMAT, {
            locale: ko,
          })}
        </span>
      </div>
      <div className='flex w-full justify-between gap-4'>
        {/* 포스터 */}
        {applicationData.poster && (
          <div className='relative h-[136px] w-[102px] flex-shrink-0 overflow-hidden rounded-12'>
            <Image
              src={applicationData.poster}
              alt={'공연 포스터'}
              fill
              className='object-cover'
            />
          </div>
        )}
        <div className='flex flex-1 flex-col justify-between overflow-hidden'>
          {/* 모임명 */}
          <h4 className='mb-1.5 truncate text-16_B text-black'>
            {applicationData.groupName}
          </h4>
          {/* 모임 정보 */}
          <div className='mb-4 flex items-center gap-2 text-13_M text-gray-700'>
            <span>{genderLabel}</span>
            {applicationData.age && (
              <>
                <div className='h-2 w-[1px] bg-gray-200' />
                <span>{applicationData.age}세</span>
              </>
            )}
          </div>
          {/* 신청자, 방장 정보 */}
          <div className='flex items-center gap-0.5'>
            <ProfileImage
              size='xs'
              border={false}
            />
            <span className='text-12_M text-gray-700'>
              {applicationData.userName}
            </span>
            <span className='flex text-12_M text-gray-700'>
              (<StarIcon className='h-3 w-3' />
              {applicationData.rating})
            </span>
          </div>
          {/* 소개글 */}
          <p className='line-clamp-2 w-full text-14_body_M text-gray-950'>
            {applicationData.applicationText}
          </p>
        </div>
      </div>
      <div className='flex w-full gap-2'>
        {secondaryButtonText && (
          <Button
            variant='secondary'
            color='normal'
            onClick={handleSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        )}
        <Button
          variant='primary'
          color={applicationData.status === 'REJECTED' ? 'disable' : 'normal'}
          disabled={applicationData.status === 'REJECTED'}
          onClick={handlePrimaryClick}
        >
          {primaryButtonText}
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;
