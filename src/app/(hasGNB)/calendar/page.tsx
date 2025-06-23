import PerformanceCalendarPage from '@/components/pages/PerformanceCalendar/PerformanceCalendarPage';
import { ScrollArea } from '@/components/ui/scroll-area';
const CalendarPage = () => (
  <>
    <ScrollArea className='h-[calc(100dvh-80px)]'>
      <div className='w-screen max-w-lg'>
        <PerformanceCalendarPage />
      </div>
    </ScrollArea>
  </>
);

export default CalendarPage;
