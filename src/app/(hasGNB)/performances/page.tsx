import { Header } from '@/components/common';
import {
  PerformanceListContainer,
  Search,
  DraggableSortOptions,
} from '@/components/pages/performances';

const PerformancesPage = () => (
  <div className='flex flex-col'>
    <div className='fixed top-0 right-0 left-0 z-[100] bg-white'>
      <Header title='공연 목록' />
      <Search />
      <DraggableSortOptions />
    </div>
    <div className='flex flex-col gap-2 px-4 pt-32'>
      <div className='grow'>
        <PerformanceListContainer />
      </div>
    </div>
  </div>
);

export default PerformancesPage;
