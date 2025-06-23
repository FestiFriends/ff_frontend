'use client';

import { useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  format,
} from 'date-fns';
import CalendarHeader from './CalendarHeader';
import WeekdayHeader from './WeekdayHeader';

interface CalendarBaseProps<T> {
  month: Date;
  events: T[];
  getDate: (event: T) => Date;
  renderCell: (date: Date, events: T[]) => React.ReactNode;
  onMonthChange?: (month: Date) => void;
  weekdayLabels?: string[];
  getDates?: (event: T) => Date[];
}

const CalendarBase = <T,>({
  month,
  events,
  getDate,
  renderCell,
  onMonthChange,
  weekdayLabels,
  getDates,
}: CalendarBaseProps<T>) => {
  const [internalMonth, setInternalMonth] = useState(month);

  const currentMonth = internalMonth;

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const grouped: Record<string, T[]> = {};

    for (const event of events) {
      const dates = getDates?.(event) ?? [getDate(event)];
      for (const d of dates) {
        const key = format(d, 'yyyy-MM-dd');
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(event);
      }
    }

    return grouped;
  }, [events, getDate, getDates]);

  const handlePrevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    setInternalMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
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
      <WeekdayHeader labels={weekdayLabels} />
      <div className='grid grid-cols-7'>
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const dayEvents = eventsByDate[key] ?? [];
          return <div key={key}>{renderCell(day, dayEvents)}</div>;
        })}
      </div>
    </div>
  );
};

export default CalendarBase;
