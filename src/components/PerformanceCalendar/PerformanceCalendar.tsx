'use client';

import { useCallback, useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import EventCalendar from '@/components/common/EventCalendar/EventCalendar';
import { performanceApi } from '@/services/performanceService';
import { Performance } from '@/types/performance';
import { isPerformanceOnDate } from '@/utils/isPerformanceOnDate';
import LoadingOverlay from '../common/LoadingOverlay/LoadingOverlay';

interface PerformanceCalendarProps {
  performances: Performance[];
  onPerformancesFetched?: (data: Performance[]) => void;
  onDateClick?: (date: Date, events: Performance[], scroll?: boolean) => void;
}

const PerformanceCalendar = ({
  performances,
  onPerformancesFetched,
  onDateClick,
}: PerformanceCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

    performanceApi
      .getPerformances({ startDate, endDate, size: 100 })
      .then((data) => {
        onPerformancesFetched?.(data);
      })
      .catch((err) => console.error('공연 로딩 오류:', err))
      .finally(() => setIsLoading(false));
  }, [currentMonth, onPerformancesFetched]);

  const handleDateClick = useCallback(
    (date: Date, _events: Performance[], scroll?: boolean) => {
      setSelectedDate(date);
      const performancesOnThatDate = performances.filter((perf) =>
        isPerformanceOnDate(perf, date)
      );
      onDateClick?.(date, performancesOnThatDate, scroll);
    },
    [performances, onDateClick]
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
