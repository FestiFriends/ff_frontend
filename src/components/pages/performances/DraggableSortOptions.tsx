'use client';

import React from 'react';
import {
  CustomSortDropdown,
  DatePicker,
  LocationSelector,
  IsExpiredButton,
} from '@/components/pages/performances';
import { useDragScroll } from '@/hooks/useDragScroll';

type DropdownOption = {
  placeholder: string;
  queryKey: string;
  data: Array<{ label: string; value: string }>;
};

const DROPDOWN_OPTIONS: Record<string, DropdownOption> = {
  SORT: {
    placeholder: '정렬',
    queryKey: 'sort',
    data: [
      { label: '최신순', value: 'date_asc' },
      { label: '모임 많은 순', value: 'group_count_desc' },
      { label: '모임 적은 순', value: 'group_count_asc' },
      { label: '찜 많은 순', value: 'favorite_count_desc' },
      { label: '찜 적은 순', value: 'favorite_count_asc' },
      { label: '이름순', value: 'title_asc' },
      { label: '이름역순', value: 'title_desc' },
    ],
  },
  CATEGORY: {
    placeholder: '유형',
    queryKey: 'visit',
    data: [
      { label: '내한', value: '내한' },
      { label: '국내', value: '국내' },
    ],
  },
};

const DraggableSortOptions = () => {
  const dragScrollRef = useDragScroll<HTMLDivElement>({
    direction: 'horizontal',
  });

  return (
    <>
      <div
        ref={dragScrollRef}
        className='z-20 scrollbar-hide flex w-full cursor-grab gap-4 overflow-x-auto px-4 py-4 select-none active:cursor-grabbing'
      >
        {Object.values(DROPDOWN_OPTIONS).map((option) => (
          <CustomSortDropdown
            key={option.queryKey}
            queryKey={option.queryKey}
            placeholder={option.placeholder}
            options={option.data}
          />
        ))}
        <LocationSelector />
        <DatePicker />
        <IsExpiredButton />
      </div>
    </>
  );
};

export default DraggableSortOptions;
