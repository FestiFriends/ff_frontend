'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ArrowUp } from 'lucide-react';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import CalendarFilter from '@/components/pages/PerformanceCalendar/CalendarFilter';
import PerformanceCalendar from '@/components/pages/PerformanceCalendar/PerformanceCalendar';
import SelectedDatePerformances from '@/components/pages/PerformanceCalendar/SelectedDatePerformances';
import { useGetPerformances } from '@/hooks/performanceHooks/performanceHooks';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { Performance } from '@/types/performance';

const PerformanceCalendarPage = () => {
  const { getPerformanceQueryString, setMultipleQueryParams, getQueryParam } =
    useQueryParam();
  const queryString = getPerformanceQueryString();

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [lastPerformances, setLastPerformances] = useState<Performance[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);

  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

  const startDate = format(start, 'yyyy-MM-dd');
  const endDate = format(end, 'yyyy-MM-dd');

  useEffect(() => {
    setMultipleQueryParams({ startDate, endDate, size: '100' });
  }, [startDate, endDate, setMultipleQueryParams]);

  const {
    data: allPerformances,
    isPending,
    isError,
  } = useGetPerformances(queryString, queryString.includes('startDate'));

  const visit = getQueryParam('visit');
  const location = getQueryParam('location');

  const filteredPerformances = useMemo(
    () =>
      allPerformances?.data?.filter((perf) => {
        const matchesVisit = !visit || perf.visit === visit;
        const matchesLocation =
          !location || perf.location?.startsWith(location);
        return matchesVisit && matchesLocation;
      }) ?? [],
    [allPerformances?.data, visit, location]
  );

  useEffect(() => {
    if (!isPending && filteredPerformances.length > 0) {
      setLastPerformances(filteredPerformances);
    }
  }, [isPending, filteredPerformances]);

  const handleDateClick = (
    date: Date,
    _events: Performance[],
    scroll = false
  ) => {
    setSelectedDate(date);
    if (scroll) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <CalendarFilter />

      <div className='relative'>
        <PerformanceCalendar
          performances={isPending ? lastPerformances : filteredPerformances}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          onDateClick={handleDateClick}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      </div>

      {isError ? (
        <StateNotice
          preset='error'
          message='데이터를 불러오는 중 오류가 발생했어요.'
        />
      ) : (
        <div ref={detailRef}>
          <SelectedDatePerformances
            date={selectedDate}
            performances={filteredPerformances}
          />
        </div>
      )}

      {showScrollToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed right-6 bottom-6 z-50 rounded-full bg-red-500 p-3 text-white shadow-lg hover:bg-red-600'
          aria-label='맨 위로'
        >
          <ArrowUp className='h-6 w-6' />
        </button>
      )}
    </div>
  );
};

export default PerformanceCalendarPage;
