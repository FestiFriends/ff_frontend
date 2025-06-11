'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  selectedDate,
  onSelectedDateChange,
  onPerformancesFetched,
  onDateClick,
}: PerformanceCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  const { data: performances = [], isLoading } = useQuery({
    queryKey: ['performances', startDate, endDate],
    queryFn: () =>
      performancesApi.getPerformances({
        startDate,
        endDate,
        size: 100,
      }),
    select: (res) => res.data.data ?? [],
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (performances.length > 0) {
      onPerformancesFetched?.(performances);
    }
  }, [performances, onPerformancesFetched]);

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
