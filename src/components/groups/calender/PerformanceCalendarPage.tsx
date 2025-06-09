'use client';

import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';
import SelectedDatePerformances from './SelectedDatePerformances';

const PerformanceCalendarPage = () => {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]);
  const [filterValues, setFilterValues] = useState<{ visit?: string }>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [myLikeList, setMyLikeList] = useState<string[]>([
    'perf-001',
    'perf-002',
  ]);

  const handleLikeClick = (perf: Performance) => {
    setMyLikeList((prev) =>
      prev.includes(perf.id)
        ? prev.filter((id) => id !== perf.id)
        : [...prev, perf.id]
    );
  };

  const filteredPerformances = useMemo(() => {
    const { visit } = filterValues;

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
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <CalendarFilter onChange={setFilterValues} />
      <PerformanceCalendar
        performances={filteredPerformances}
        onPerformancesFetched={setAllPerformances}
        onDateClick={handleDateClick}
      />
      <div ref={detailRef}>
        <SelectedDatePerformances
          date={selectedDate}
          performances={filteredPerformances}
          onCardClick={(perf) => {
            router.push(`/performances/${perf.id}`);
          }}
          onLikeClick={handleLikeClick}
          isLiked={(perf) => myLikeList.includes(perf.id)}
        />
      </div>
    </div>
  );
};

export default PerformanceCalendarPage;
