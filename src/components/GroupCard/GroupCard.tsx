'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { GroupCategory } from '@/types/enums';
import { getGenderLabels } from '@/utils/genderEnumLabel';
import { getGroupCategoryLabels } from '@/utils/groupEnumLabel';
import HashtagBadge from '../Hashtag/HashtagBadge';
import Button from '../Button/Button';
import { Group } from '@/types/group';

interface GroupCardProps {
  groupData: Group;
  className?: string;
  buttonText: string;
  isHashtagClickable?: boolean;
  onButtonClick: () => void;
  onHashtagClick?: (hashtagText: string) => void;
}

const GroupCard = ({
  groupData,
  className,
  buttonText,
  isHashtagClickable = false,
  onButtonClick,
  onHashtagClick,
}: GroupCardProps) => {
  const groupTypeStyles: Record<string, string> = {
    [GroupCategory.COMPANION]: 'bg-blue-100 text-blue-600',
    [GroupCategory.RIDE_SHARE]: 'bg-green-100 text-green-600',
    [GroupCategory.ROOM_SHARE]: 'bg-purple-100 text-purple-600',
  };

  const categoryLabel = getGroupCategoryLabels(groupData.category);
  const groupTypeClass = groupTypeStyles[groupData.category];
  const genderLabel = getGenderLabels(groupData.gender);
  const handleButtonClick = () => {
    onButtonClick && onButtonClick();
  };
  const handleHashtagClick = (hashtagText: string) => {
    onHashtagClick && onHashtagClick(hashtagText);
  };
  return (
    <div
      className={cn(
        'flex w-full max-w-full flex-col gap-4 overflow-hidden rounded-xl border p-4 shadow-sm sm:flex-row',
        className
      )}
    >
      <div className='flex flex-col gap-2'>
        {/* 포스터 이미지 */}
        <div className='relative h-32 w-24 flex-shrink-0 overflow-hidden'>
          <Image
            src={groupData.performance.poster}
            alt='공연 포스터'
            fill
            className='object-cover'
          />
        </div>
        <Button
          size='lg'
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
      {/* 텍스트 영역 */}
      <div className='flex w-full flex-col justify-between'>
        <div>
          {/* 상단 정보 */}
          <div className='mb-1 flex items-center justify-between'>
            <span
              className={cn(
                'rounded-full px-2 py-1 text-xs font-medium',
                groupTypeClass
              )}
            >
              {categoryLabel}
            </span>

            <span className='text-xs text-gray-400'>
              {groupData.startDate} ~ {groupData.endDate}
            </span>
          </div>

          {/* 공연명 / 모임명 */}
          <h3 className='text-sm font-bold text-gray-800'>{groupData.title}</h3>
          <h4 className='text-sm text-gray-600'>
            {groupData.location} · {genderLabel} · {groupData.startAge}~
            {groupData.endAge}세
          </h4>

          {/* 소개글 */}
          <p className='mt-1 line-clamp-2 text-xs text-gray-600'>
            {groupData.description}
          </p>
        </div>
        {/* 인원 수 프로그레스 바 */}
        <div className='mt-2'>
          <div className='mb-0.5 flex justify-between text-xs text-gray-500'>
            <span>모집 인원</span>
            <span>
              {groupData.memberCount} / {groupData.maxMembers} 명
            </span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full rounded-full bg-blue-500 transition-all'
              style={{
                width: `${(groupData.memberCount / groupData.maxMembers) * 100}%`,
              }}
            />
          </div>
        </div>
        {/* 해시태그 */}
        <div className='mt-1 flex gap-1'>
          {groupData.hashtag?.map((tag, i) => (
            <HashtagBadge
              key={tag}
              type='groupCard'
              isClickable={isHashtagClickable}
              text={`#${tag}`}
              onClick={handleHashtagClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
