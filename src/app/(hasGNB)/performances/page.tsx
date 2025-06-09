import {
  PerformanceListContainer,
  Search,
  SortDropdown,
  Filter,
  DatePicker,
} from '@/components/pages/performances';

const PerformancesPage = () => (
  <>
    <Search />
    <div className='flex'>
      <SortDropdown
        queryKey='sort'
        placeholder='정렬'
      />
      <SortDropdown
        queryKey='category'
        placeholder='유형'
      />
      <Filter />
      <DatePicker />
    </div>
    <PerformanceListContainer />
  </>
);

export default PerformancesPage;
