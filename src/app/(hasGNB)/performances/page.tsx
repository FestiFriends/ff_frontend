import {
  PerformanceListContainer,
  Search,
  SortDropdown,
  DatePicker,
} from '@/components/pages/performances';
import { LocationLabels } from '@/constants/locationLabels';
import { LocationValues } from '@/constants/locationValues';
import { Location } from '@/types/enums';

const DROPDOWN_OPTIONS = {
  SORT: {
    placeholder: '정렬',
    queryKey: 'sort',
    data: [
      { label: '최신순', value: 'latest' },
      { label: '인기순', value: 'popular' },
      { label: '이름순', value: 'name' },
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
  },
};

const PerformancesPage = () => (
  <>
    <Search />
    <div className='flex'>
      {Object.values(DROPDOWN_OPTIONS).map((option) => (
        <SortDropdown
          key={option.queryKey}
          queryKey={option.queryKey}
          placeholder={option.placeholder}
          options={option.data}
        />
      ))}
      <DatePicker />
    </div>
    <PerformanceListContainer />
  </>
);

export default PerformancesPage;
