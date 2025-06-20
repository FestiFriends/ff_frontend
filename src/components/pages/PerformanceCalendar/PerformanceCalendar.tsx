'use client';

import { useCallback } from 'react';
import EventCalendar from '@/components/pages/PerformanceCalendar/EventCalendar';
import { Performance } from '@/types/performance';
import { isPerformanceOnDate } from '@/utils/isPerformanceOnDate';

interface PerformanceCalendarProps {
  performances: Performance[];
  selectedDate?: Date | null;
  currentMonth?: Date;
  onSelectedDateChange?: (date: Date) => void;
  onDateClick?: (date: Date, events: Performance[], scroll?: boolean) => void;
  onMonthChange: (month: Date) => void;
}

const PerformanceCalendar = ({
  performances,
  selectedDate,
  onSelectedDateChange,
  onDateClick,
  currentMonth,
  onMonthChange,
}: PerformanceCalendarProps) => {
  const handleDateClick = useCallback(
    (date: Date, _events: Performance[], scroll?: boolean) => {
      onSelectedDateChange?.(date);
      const performancesOnThatDate = performances.filter((perf) =>
        isPerformanceOnDate(perf, date)
      );
      onDateClick?.(date, performancesOnThatDate, scroll);
    },
    [performances, onDateClick, onSelectedDateChange]
  );

  return (
    <EventCalendar
      month={currentMonth!}
      performances={performances}
      onMonthChange={onMonthChange}
      selectedDate={selectedDate ?? undefined}
      onDateClick={handleDateClick}
      onPerformanceClick={(perf) => console.log(perf)}
    />
  );
};

export default PerformanceCalendar;
