'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import StarIcon from '@/components/icons/StarIcon';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { cn } from '@/lib/utils';
import { GroupCategoryType } from '@/types/enums';
import { Group } from '@/types/group';
import Badge from '../Badge/Badge';
import { badgeStyles } from '../Badge/Badge.styles';
import Button from '../Button/Button';
import { buttonStyles } from '../Button/Button.styles';
import HashtagGroup from '../HashtagBadgeGroup/HashtagBadgeGroup';
import ProfileImage from '../ProfileImage/ProfileImage';
import ProgressBar from '../ProgressBar/ProgressBar';

interface GroupCardProps {
  groupData: Group;
  className?: string;
  buttonText: string;
  isHashtagClickable?: boolean;
  onCardClick?: () => void;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onHashtagClick?: (hashtagText: string) => void;
  buttonColor?: keyof typeof buttonStyles.variants.primary;
  buttonDisabled?: boolean;
}

const DATE_FORMAT = 'yy.MM.dd';

const GroupCard = ({
  groupData,
  className,
  buttonText,
  isHashtagClickable = false,
  onCardClick,
  onButtonClick,
  onHashtagClick,
  buttonColor = 'normal',
  buttonDisabled = false,
}: GroupCardProps) => {
  const genderLabel = GenderLabels[groupData.gender];

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if ('key' in e && !(e.key === 'Enter' || e.key === ' ')) {
      return;
    }

    onCardClick?.();
  };

  const handleHashtagClick = (
    tag: string,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.stopPropagation();
    onHashtagClick?.(tag);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onButtonClick(e);
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardClick}
      className={cn(
        'flex w-full flex-col items-start justify-center gap-3 rounded-2xl bg-gray-25 p-5',
        className
      )}
    >
      {/* 카테고리, 날짜 */}
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-0.5'>
          <Badge
            label={GroupCategoryLabels[groupData.category as GroupCategoryType]}
            className={
              badgeStyles.category[groupData.category as GroupCategoryType]
            }
          />
          {groupData.isHost && <span>👑</span>}
        </div>
        <span className='text-12_M text-gray-600'>
          {format(new Date(groupData.startDate), DATE_FORMAT, {
            locale: ko,
          })}
          ~
          {format(new Date(groupData.endDate), DATE_FORMAT, {
            locale: ko,
          })}
        </span>
      </div>
      <div className='flex w-full justify-between gap-4'>
        {/* 포스터 */}
        {groupData.performance?.poster && (
          <div className='relative h-[136px] w-[102px] flex-shrink-0 overflow-hidden rounded-12'>
            <Image
              src={groupData.performance.poster}
              alt={groupData.performance?.title || '공연 포스터'}
              width={102}
              height={136}
              sizes='102px'
              className='object-cover'
            />
          </div>
        )}
        <div className='flex flex-1 flex-col justify-between overflow-hidden'>
          {/* 공연명 */}
          {groupData.performance?.title && (
            <h4 className='mb-1.5 truncate text-12_B text-black'>
              {groupData.performance.title}
            </h4>
          )}
          {/* 모임명 */}
          <h4 className='mb-1.5 truncate text-16_B text-black'>
            {groupData.title}
          </h4>
          {/* 모임 정보 */}
          <div className='mb-2.5 flex items-center gap-2 text-13_M text-gray-700'>
            <span>{groupData.location}</span>
            <div className='h-2 w-[1px] bg-gray-200' />
            <span>{genderLabel}</span>
            <div className='h-2 w-[1px] bg-gray-200' />
            <span>
              {groupData.startAge}~{groupData.endAge}세
            </span>
          </div>
          {/* 방장 정보 */}
          <div className='flex items-center gap-0.5'>
            <ProfileImage
              size='xs'
              border={false}
            />
            <span className='text-12_M text-gray-700'>
              {groupData.host.name}
            </span>
            <span className='flex text-12_M text-gray-700'>
              (<StarIcon className='h-3 w-3' />
              {groupData.host.rating})
            </span>
          </div>
          {/* 소개글 */}
          <p className='line-clamp-2 w-full text-14_body_M text-gray-950'>
            {groupData.description}
          </p>
        </div>
      </div>
      {/* 인원 수 프로그레스 바 */}
      <ProgressBar
        current={groupData.memberCount}
        total={groupData.maxMembers}
      />
      {/* 해시태그 */}
      {groupData.hashtag && (
        <HashtagGroup
          hashtags={groupData.hashtag}
          isClickable={isHashtagClickable}
          onClick={handleHashtagClick}
        />
      )}
      <div className='flex w-full gap-2'>
        <Button
          variant='primary'
          color={buttonColor}
          onClick={handleButtonClick}
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default GroupCard;
