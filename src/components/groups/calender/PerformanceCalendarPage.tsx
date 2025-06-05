'use client';

import { useState, useMemo } from 'react';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';

const PerformanceCalendarPage = () => {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]);
  const [filterValues, setFilterValues] = useState<{ visit?: string }>({});

  const filteredPerformances = useMemo(() => {
    const { visit } = filterValues;

    return allPerformances.filter((perf) => {
      const matchVisit = !visit || perf.visit === visit;
      return matchVisit;
    });
  }, [allPerformances, filterValues]);

  return (
    <div className='space-y-6'>
      <CalendarFilter onChange={setFilterValues} />
      <PerformanceCalendar
        performances={filteredPerformances}
        onPerformancesFetched={setAllPerformances}
      />
    </div>
  );
};

export default PerformanceCalendarPage;
