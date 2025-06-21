'use client';

import { format, isBefore } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { HashtagGroup, ProfileImage, ProgressBar } from '@/components/common';
import { StarIcon } from '@/components/icons';
import { GenderLabels } from '@/constants';
import { cn } from '@/lib/utils';
import { Group } from '@/types/group';

interface ProfileJoinedGroupsCardProps {
  groupData: Group;
  className?: string;
  onCardClick?: () => void;
  onHashtagClick?: (hashtagText: string) => void;
  isHashtagClickable?: boolean;
}

const DATE_FORMAT = 'yy.MM.dd';

const ProfileJoinedGroupsCard = ({
  groupData,
  className,
  onCardClick,
  onHashtagClick,
  isHashtagClickable = false,
}: ProfileJoinedGroupsCardProps) => {
  const genderLabel = GenderLabels[groupData.gender];
  const isClosed = isBefore(new Date(groupData.endDate), new Date());

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if ('key' in e && !(e.key === 'Enter' || e.key === ' ')) return;
    onCardClick?.();
  };

  const handleHashtagClick = (
    tag: string,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.stopPropagation();
    onHashtagClick?.(tag);
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
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-1'>
          {groupData.isHost && (
            <>
              <div className='inline-flex items-center rounded-full bg-[#FFF8DD] px-2 py-1'>
                <span className='text-12_B text-[#FF9900]'>방장 👑</span>
              </div>
            </>
          )}
          {!groupData.isHost && isClosed && (
            <>
              <div className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1'>
                <span className='text-12_B text-gray-500'>마감</span>
              </div>
            </>
          )}
          {!groupData.isHost && !isClosed && (
            <>
              <div className='inline-flex items-center rounded-full bg-[#FFEDF6] px-2 py-1'>
                <span className='text-12_B text-[#FF468A]'>참여 중</span>
              </div>
            </>
          )}
        </div>
        <span className='text-12_M text-gray-600'>
          {format(new Date(groupData.startDate), DATE_FORMAT, { locale: ko })}~
          {format(new Date(groupData.endDate), DATE_FORMAT, { locale: ko })}
        </span>
      </div>

      <div className='flex w-full justify-between gap-4'>
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
          {groupData.performance?.title && (
            <h4 className='mb-1.5 truncate text-12_B text-black'>
              {groupData.performance.title}
            </h4>
          )}
          <h4 className='mb-1.5 truncate text-16_B text-black'>
            {groupData.title}
          </h4>
          <div className='mb-2.5 flex items-center gap-2 text-13_M text-gray-700'>
            <span>{groupData.location}</span>
            <div className='h-2 w-[1px] bg-gray-200' />
            <span>{genderLabel}</span>
            <div className='h-2 w-[1px] bg-gray-200' />
            <span>
              {groupData.startAge}~{groupData.endAge}세
            </span>
          </div>
          <div className='flex items-center gap-0.5'>
            <ProfileImage
              size='xs'
              src={groupData.host.profileImage}
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
          <p className='line-clamp-2 w-full text-14_body_M text-gray-950'>
            {groupData.description}
          </p>
        </div>
      </div>

      <ProgressBar
        current={groupData.memberCount}
        total={groupData.maxMembers}
      />

      {groupData.hashtag && (
        <HashtagGroup
          hashtags={groupData.hashtag}
          isClickable={isHashtagClickable}
          onClick={handleHashtagClick}
        />
      )}
    </div>
  );
};

export default ProfileJoinedGroupsCard;
