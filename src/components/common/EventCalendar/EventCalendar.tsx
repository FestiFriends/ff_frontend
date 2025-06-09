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
  selectedDate?: Date;
  onPerformanceClick?: (performance: Performance) => void;
  onDateClick?: (date: Date, performances: Performance[]) => void;
  onMonthChange?: (month: Date) => void;
}

const EventCalendar = ({
  month,
  performances,
  selectedDate,
  onPerformanceClick,
  onDateClick,
  onMonthChange,
}: EventCalendarProps) => {
  const [internalMonth, setInternalMonth] = useState(month);
  const currentMonth = internalMonth;

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const result = getEventsByDate(performances);
    return result;
  }, [performances]);

  const handlePrevMonth = () => {
    const newMonth = new Date(
      internalMonth.getFullYear(),
      internalMonth.getMonth() - 1
    );
    setInternalMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      internalMonth.getFullYear(),
      internalMonth.getMonth() + 1
    );
    setInternalMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  return (
    <div className='mx-auto w-full p-4'>
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <WeekdayHeader />
      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        eventsByDate={eventsByDate}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        onPerformanceClick={onPerformanceClick}
      />
    </div>
  );
};

export default EventCalendar;
