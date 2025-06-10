'use client';

import { useCallback, useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import EventCalendar from '@/components/common/EventCalendar/EventCalendar';
import LoadingOverlay from '@/components/common/LoadingOverlay/LoadingOverlay';
import { performancesApi } from '@/services/performancesService';
import { Performance } from '@/types/performance';
import { isPerformanceOnDate } from '@/utils/isPerformanceOnDate';

interface PerformanceCalendarProps {
  performances: Performance[];
  selectedDate?: Date | null;
  onSelectedDateChange?: (date: Date) => void;
  onPerformancesFetched?: (data: Performance[]) => void;
  onDateClick?: (date: Date, events: Performance[], scroll?: boolean) => void;
}

const PerformanceCalendar = ({
  performances,
  selectedDate,
  onSelectedDateChange,
  onPerformancesFetched,
  onDateClick,
}: PerformanceCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

    performancesApi
      .getPerformances({ startDate, endDate, size: 100 })
      .then((res) => {
        const performances = res.data.data ?? [];
        onPerformancesFetched?.(performances);
      })
      .catch((err) => console.error('공연 로딩 오류:', err))
      .finally(() => setIsLoading(false));
  }, [currentMonth, onPerformancesFetched]);

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
    <div className='relative'>
      <EventCalendar
        month={currentMonth}
        performances={performances}
        onMonthChange={setCurrentMonth}
        selectedDate={selectedDate ?? undefined}
        onDateClick={handleDateClick}
        onPerformanceClick={(perf) => console.log(perf)}
      />
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default PerformanceCalendar;
