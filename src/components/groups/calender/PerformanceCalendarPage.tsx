'use client';

import { useState, useMemo } from 'react';
import { regionFilterData } from '@/mocks/regionFilterData';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';

const PerformanceCalendarPage = () => {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]);
  const [filterValues, setFilterValues] = useState<string[]>([]);

  const filteredPerformances = useMemo(() => {
    const [location] = filterValues;

    return allPerformances.filter((perf) => {
      const matchlocation = !location || perf.location === location;
      return matchlocation;
    });
  }, [allPerformances, filterValues]);

  return (
    <div className='space-y-6'>
      <CalendarFilter
        data={regionFilterData}
        onChange={setFilterValues}
      />
      <PerformanceCalendar
        performances={filteredPerformances}
        onPerformancesFetched={setAllPerformances}
      />
    </div>
  );
};

export default PerformanceCalendarPage;
