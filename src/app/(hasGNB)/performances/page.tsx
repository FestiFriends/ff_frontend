import Header from '@/components/common/Header/Header';
import {
  CustomSortDropdown,
  DatePicker,
  LocationSelector,
  PerformanceListContainer,
  Search,
} from '@/components/pages/performances';

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

const PerformancesPage = () => (
  <div className='flex flex-col'>
    <div className='fixed top-0 right-0 left-0 z-[100] bg-white'>
      <Header title='공연 목록' />
      <Search />
      <div className='px-4 py-2'>
        <div className='z-20 scrollbar-hide flex w-full gap-4 overflow-x-auto'>
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
        </div>
      </div>
    </div>
    <div className='flex flex-col gap-2 px-4 pt-32'>
      <div className='grow'>
        <PerformanceListContainer />
      </div>
    </div>
  </div>
);

export default PerformancesPage;
