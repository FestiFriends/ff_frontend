import {
  PerformanceListContainer,
  Search,
  SortDropdown,
  DatePicker,
} from '@/components/pages/performances';
import { LocationLabels } from '@/constants/locationLabels';
import { LocationValues } from '@/constants/locationValues';
import { Location } from '@/types/enums';

type DropdownOption = {
  placeholder: string;
  queryKey: string;
  data: Array<{ label: string; value: string }>;
  width?: 'full' | 'auto';
};

const DROPDOWN_OPTIONS: Record<string, DropdownOption> = {
  SORT: {
    placeholder: '정렬',
    queryKey: 'sort',
    data: [
      { label: '최신순', value: 'date_asc' },
      { label: '모임 많은 순', value: 'group_count_desc' },
      { label: '모임 적은 순', value: 'group_count_asc' },
      { label: '이름순', value: 'name_asc' },
      { label: '이름역순', value: 'name_desc' },
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
  LOCATION: {
    placeholder: '위치',
    queryKey: 'location',
    data: Object.values(Location).map((locationKey) => ({
      label: `${LocationLabels[locationKey]}`,
      value: `${LocationValues[locationKey]}`,
    })),
    width: 'full',
  },
};

const PerformancesPage = () => (
  <div className='flex flex-col gap-2'>
    <Search />
    <div className='z-1 flex w-full gap-4 px-4'>
      {Object.values(DROPDOWN_OPTIONS).map((option) => (
        <SortDropdown
          key={option.queryKey}
          queryKey={option.queryKey}
          placeholder={option.placeholder}
          options={option.data}
          width={option.width}
          className='w-fit'
        />
      ))}
      <DatePicker />
    </div>
    <div className='grow'>
      <PerformanceListContainer />
    </div>
  </div>
);

export default PerformancesPage;
