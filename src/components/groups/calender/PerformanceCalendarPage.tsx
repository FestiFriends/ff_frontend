'use client';

import { useState, useMemo } from 'react';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';
import SelectedDatePerformances from './SelectedDatePerformances';

const PerformanceCalendarPage = () => {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]);
  const [filterValues, setFilterValues] = useState<{ visit?: string }>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredPerformances = useMemo(() => {
    const { visit } = filterValues;

    return allPerformances.filter((perf) => {
      const matchVisit = !visit || perf.visit === visit;
      return matchVisit;
    });
  }, [allPerformances, filterValues]);

  return (
    <div className='"max-w-screen-lg mx-auto px-4 py-8'>
      <CalendarFilter onChange={setFilterValues} />
      <PerformanceCalendar
        performances={filteredPerformances}
        onPerformancesFetched={setAllPerformances}
        onDateClick={(date) => setSelectedDate(date)}
      />
      <SelectedDatePerformances
        date={selectedDate}
        performances={filteredPerformances}
      />
    </div>
  );
};

export default PerformanceCalendarPage;
