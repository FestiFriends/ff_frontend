'use client';

import { useState, useRef, useEffect } from 'react';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { ArrowUp } from 'lucide-react';
import LoadingOverlay from '@/components/common/LoadingOverlay/LoadingOverlay';
import { useGetPerformances } from '@/hooks/performanceHooks/performanceHooks';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';
import SelectedDatePerformances from './SelectedDatePerformances';

const PerformanceCalendarPage = () => {
  const { getPerformanceQueryString, setMultipleQueryParams } = useQueryParam();
  const queryString = getPerformanceQueryString();

  const [filterValues, setFilterValues] = useState<{ visit?: string }>({});
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  const {
    data: allPerformances,
    isPending,
    isError,
  } = useGetPerformances(queryString, queryString.includes('startDate'));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const queryParams = {
      startDate,
      endDate,
      size: '100',
    };
    setMultipleQueryParams(queryParams);
  }, [startDate, endDate, setMultipleQueryParams]);

  const filteredPerformances =
    allPerformances?.data?.filter(
      (perf) => !filterValues.visit || perf.visit === filterValues.visit
    ) || [];

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

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <CalendarFilter onChange={setFilterValues} />
      <div className='relative'>
        {isPending && <LoadingOverlay />}
        {isError && <></>}
        <PerformanceCalendar
          performances={filteredPerformances}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          onDateClick={handleDateClick}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      </div>
      <div ref={detailRef}>
        <SelectedDatePerformances
          date={selectedDate}
          performances={filteredPerformances}
        />
      </div>
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
