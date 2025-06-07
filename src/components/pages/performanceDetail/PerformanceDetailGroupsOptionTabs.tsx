'use client';

import DatePicker from '@/components/common/DatePicker/DatePicker';
import Filter from '@/components/common/Filter/Filter';
import SortDropdown from '@/components/common/SortDropdown/SortDropdown';
import { MultiLevelData } from '@/hooks/useMultiLevelFilter/useMultiLevelFilter';
import { DateRange } from '@/types/dateRange';

interface Props {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  setSortType: (sortType: string) => void;
}

const sortOptions = [
  { label: '최신순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
];

const festivalRegionFilter: MultiLevelData[] = [
  {
    label: '서울',
    value: 'seoul',
    children: [
      {
        label: '마포구',
        value: 'mapo',
        children: [{ label: '합정동', value: 'hapjeong' }],
      },
    ],
  },
];

const PerformanceDetailGroupsOptionTabs = ({
  dateRange,
  setDateRange,
  setSortType,
}: Props) => (
  <div>
    <div className='flex items-center gap-1'>
      <SortDropdown
        placeholder='정렬'
        options={sortOptions}
        onChange={setSortType}
      />
      <DatePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        placeholder='날짜'
        onChange={setDateRange}
      />
      <Filter data={festivalRegionFilter} />
      <Filter data={festivalRegionFilter} />
    </div>
  </div>
);

export default PerformanceDetailGroupsOptionTabs;
