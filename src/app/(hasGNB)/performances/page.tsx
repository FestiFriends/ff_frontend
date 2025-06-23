import { Header } from '@/components/common';
import {
  PerformanceListContainer,
  Search,
  DraggableSortOptions,
} from '@/components/pages/performances';
import { ScrollArea } from '@/components/ui/scroll-area';

const PerformancesPage = () => (
  <div className='flex flex-col'>
    <>
      <Header title='공연 목록' />
      <Search />
      <DraggableSortOptions />
    </>
    <ScrollArea className='h-[calc(100dvh-202.6px)] p-4 pt-0'>
      <div className='max-w-[calc(100dvw-32px)]'>
        <PerformanceListContainer />
      </div>
    </ScrollArea>
  </div>
);

export default PerformancesPage;
