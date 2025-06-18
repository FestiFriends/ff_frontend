'use client';

import Button from '@/components/common/Button/Button';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import StarIcon from '@/components/icons/StarIcon';
import { GenderLabels } from '@/constants/genderLabels';
import { cn } from '@/lib/utils';
import { Application as ApplicationType } from '@/types/application';
import { GenderType } from '@/types/enums';
import { formatNormalDate } from '@/utils/date';

interface ApplicationProps {
  applicationData: ApplicationType;
  className?: string;
  onCardClick?: () => void;
  primaryButtonText: string;
  onPrimaryClick: () => void;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
}

const Application = ({
  applicationData,
  className,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
}: ApplicationProps) => {
  const genderLabel = GenderLabels[applicationData.gender as GenderType];

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
  };

  const handlePrimaryClick = () => {
    onPrimaryClick();
  };
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-center gap-4 bg-gray-25 pt-5 pb-6',
        className
      )}
    >
      {/* 성별 나이 */}
      <div className='flex w-full items-center justify-between text-13_M text-gray-700'>
        <div className='flex items-center gap-1.5'>
          <span>{genderLabel}</span>
          <div className='h-2 w-[1px] bg-gray-200' />
          <span>{applicationData.age}세</span>
        </div>
        <span>{formatNormalDate(applicationData.createdAt)}</span>
      </div>
      <div className='flex w-full justify-between gap-4'>
        <div className='flex flex-1 flex-col gap-2 text-12_M text-gray-700'>
          {/* 신청자, 방장 정보 */}
          <div className='flex items-center gap-0.5'>
            <ProfileImage
              size='xs'
              border={false}
            />
            <span>{applicationData.userName}</span>
            <span className='flex'>
              (<StarIcon className='h-3 w-3' />
              {applicationData.rating})
            </span>
          </div>
          {/* 소개글 */}
          <p className='w-full text-14_body_M text-gray-950'>
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

export default Application;
