'use client';

import DatePicker from '@/components/common/DatePicker/DatePicker';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTriggerWithIcon,
} from '@/components/common/Dropdown';
import SortDropdown from '@/components/common/SortDropdown/SortDropdown';
import { Skeleton } from '@/components/ui/skeleton';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { LocationLabels } from '@/constants/locationLabels';
import { DateRange } from '@/types/dateRange';
import { generateFilterOptions } from '@/utils';

interface Props {
  isPending: boolean;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  setSortType: (sortType: string) => void;
  setCategory: (category: string) => void;
  setLocation: (location: string) => void;
  setGender: (gender: string) => void;
}

const sortOptions = [
  { label: '최신순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
];

const categoryOptions = generateFilterOptions(GroupCategoryLabels);
const locationOptions = generateFilterOptions(LocationLabels);
const genderOptions = generateFilterOptions(GenderLabels);

const PerformanceDetailGroupsOptionTabs = ({
  isPending,
  dateRange,
  setDateRange,
  setSortType,
  setCategory,
  setLocation,
  setGender,
}: Props) => {
  if (isPending)
    return (
      <div>
        <Skeleton className='h-[10vh] w-full' />
      </div>
    );

  return (
    <div className='flex flex-col gap-2 md:flex-row'>
      <div className='flex gap-2'>
        <SortDropdown
          placeholder='정렬'
          options={sortOptions}
          onChange={setSortType}
        />
        <SortDropdown
          placeholder='카테고리'
          options={categoryOptions}
          onChange={setCategory}
        />
        <SortDropdown
          placeholder='성별'
          options={genderOptions}
          onChange={setGender}
        />
      </div>
      <div className='flex gap-2'>
        <Dropdown>
          <DropdownTriggerWithIcon
            placeholder='지역'
            className='whitespace-nowrap'
          />
          <DropdownContent className='fixed top-1/2 left-1/2 z-10 inline-flex w-[calc(100vw-1rem)] max-w-[350px] -translate-x-1/2 -translate-y-1/2 justify-center overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white p-5'>
            <div className='grid grid-cols-4 place-items-center gap-2.5'>
              {locationOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  label={option.label}
                  onClick={() => setLocation(option.value)}
                  className='flex items-center justify-center gap-2 rounded-[80px] border-1 border-gray-100 px-5 py-3 text-14_M leading-normal tracking-[-0.35px] whitespace-nowrap'
                >
                  {option.label}
                </DropdownItem>
              ))}
            </div>
          </DropdownContent>
        </Dropdown>
        <DatePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          placeholder='날짜'
          onChange={setDateRange}
        />
      </div>
    </div>
  );
};

export default PerformanceDetailGroupsOptionTabs;
