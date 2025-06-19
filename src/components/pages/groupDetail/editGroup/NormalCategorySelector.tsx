'use client';
import React from 'react';
import CarIcon from '@/components/icons/CarIcon';
import GroupIcon from '@/components/icons/GroupIcon';
import SleepIcon from '@/components/icons/SleepIcon';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  value: (typeof GroupCategoryLabels)[keyof typeof GroupCategoryLabels];
  onChange: (
    v: (typeof GroupCategoryLabels)[keyof typeof GroupCategoryLabels]
  ) => void;
  className?: string;
}

const NormalCategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
  className,
}) => (
  <>
    <div className='mb-2.5 text-14_B text-black'>종류</div>
    <div className={cn('flex w-full gap-2 text-16_M', className)}>
      <button
        onClick={() => onChange(GroupCategoryLabels.COMPANION)}
        className={cn(
          'flex items-center justify-center gap-1 rounded-full px-5 py-3',
          value === GroupCategoryLabels.COMPANION
            ? 'bg-gray-950 text-white'
            : 'border border-gray-100 bg-white text-gray-950'
        )}
      >
        <GroupIcon className='h-4 w-4' />
        <span>동행</span>
      </button>
      <button
        onClick={() => onChange(GroupCategoryLabels.RIDE_SHARE)}
        className={cn(
          'flex items-center justify-center gap-1 rounded-full px-5 py-3',
          value === GroupCategoryLabels.RIDE_SHARE
            ? 'bg-gray-950 text-white'
            : 'border border-gray-100 bg-white text-gray-950'
        )}
      >
        <CarIcon className='h-4 w-4' />
        <span>탑승</span>
      </button>
      <button
        onClick={() => onChange(GroupCategoryLabels.ROOM_SHARE)}
        className={cn(
          'flex items-center justify-center gap-1 rounded-full px-5 py-3',
          value === GroupCategoryLabels.ROOM_SHARE
            ? 'bg-gray-950 text-white'
            : 'border border-gray-100 bg-white text-gray-950'
        )}
      >
        <SleepIcon className='h-4 w-4' />
        <span>숙박</span>
      </button>
    </div>
  </>
);

export default NormalCategorySelector;
