'use client';

import DatePicker from '@/components/common/DatePicker/DatePicker';
import SortDropdown from '@/components/common/SortDropdown/SortDropdown';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { LocationLabels } from '@/constants/locationLabels';
import { DateRange } from '@/types/dateRange';
import { generateFilterOptions } from '@/utils/generateFilterOptions';

interface Props {
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
  dateRange,
  setDateRange,
  setSortType,
  setCategory,
  setLocation,
  setGender,
}: Props) => (
  <div>
    <div className='flex items-center gap-1'>
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
      <DatePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        placeholder='날짜'
        onChange={setDateRange}
      />
      <SortDropdown
        placeholder='지역'
        options={locationOptions}
        onChange={setLocation}
      />
      <SortDropdown
        placeholder='성별'
        options={genderOptions}
        onChange={setGender}
      />
    </div>
  </div>
);

export default PerformanceDetailGroupsOptionTabs;
