import { useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Performance } from '@/types/performance';
import getEventsByDate from '@/utils/getEventsByDate';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import WeekdayHeader from './WeekdayHeader';

interface EventCalendarProps {
  month: Date;
  performances: Performance[];
  onPerformanceClick?: (performance: Performance) => void;
  onDateClick?: (date: Date, performances: Performance[]) => void;
}

const EventCalendar = ({
  month,
  performances,
  onPerformanceClick,
  onDateClick,
}: EventCalendarProps) => {
  const [internalMonth, setInternalMonth] = useState(month);
  const currentMonth = internalMonth;

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsByDate = useMemo(
    () => getEventsByDate(performances),
    [performances]
  );

  return (
    <div className='w-full'>
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={() =>
          setInternalMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
          )
        }
        onNext={() =>
          setInternalMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
          )
        }
      />
      <WeekdayHeader />
      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        eventsByDate={eventsByDate}
        onDateClick={onDateClick}
        onPerformanceClick={onPerformanceClick}
      />
    </div>
  );
};

export default EventCalendar;
