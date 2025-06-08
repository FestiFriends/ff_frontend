'use client';

import { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import EventCalendar from '@/components/common/EventCalendar/EventCalendar';
import { performanceApi } from '@/services/performanceService';
import { Performance } from '@/types/performance';

interface PerformanceCalendarProps {
  performances: Performance[];
  onPerformancesFetched?: (data: Performance[]) => void;
  onDateClick?: (date: Date) => void;
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

  if (isLoading) return <p>공연 정보를 불러오는 중...</p>;

  return (
    <EventCalendar
      month={currentMonth}
      performances={performances}
      onMonthChange={setCurrentMonth}
      selectedDate={selectedDate ?? undefined}
      onDateClick={(date) => {
        setSelectedDate(date);
        onDateClick?.(date);
      }}
      onPerformanceClick={(perf) => console.log(perf)}
    />
  );
};

export default PerformanceCalendar;
