'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { ArrowUp } from 'lucide-react';
import LoadingOverlay from '@/components/common/LoadingOverlay/LoadingOverlay';
import { performancesApi } from '@/services/performancesService';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';
import SelectedDatePerformances from './SelectedDatePerformances';

const PerformanceCalendarPage = () => {
  const [filterValues, setFilterValues] = useState<{ visit?: string }>({});
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  const { data: allPerformances, isLoading } = useQuery({
    queryKey: ['performances', startDate, endDate],
    queryFn: () =>
      performancesApi.getPerformances({ startDate, endDate, size: 100 }),
    select: (res) => res.data.data ?? [],
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPerformances = useMemo(() => {
    const { visit } = filterValues;
    if (!allPerformances) return [];

    return allPerformances.filter((perf) => {
      const matchVisit = !visit || perf.visit === visit;
      return matchVisit;
    });
  }, [allPerformances, filterValues]);

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
        {isLoading && <LoadingOverlay />}
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
