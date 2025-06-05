'use client';

import { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import EventCalendar from '@/components/common/EventCalendar/EventCalendar';
import { performanceApi } from '@/services/performanceService';
import { Performance } from '@/types/performance';

const PerformanceCalender = () => {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  useEffect(() => {
    const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

    performanceApi
      .getPerformances({ startDate, endDate, size: 100 })
      .then((data) => {
        setPerformances(data);
      })
      .catch((err) => console.error('공연 로딩 오류:', err))
      .finally(() => setIsLoading(false));
  }, [currentMonth]);

  if (isLoading) return <p>공연 정보를 불러오는 중...</p>;

  return (
    <EventCalendar
      month={currentMonth}
      performances={performances}
      onMonthChange={setCurrentMonth}
      onDateClick={(date, events) => console.log(date, events)}
      onPerformanceClick={(perf) => console.log(perf)}
    />
  );
};

export default PerformanceCalender;
