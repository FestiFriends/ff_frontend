'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Performance } from '@/types/performance';
import CalendarFilter from './CalendarFilter';
import PerformanceCalendar from './PerformanceCalendar';
import SelectedDatePerformances from './SelectedDatePerformances';

const PerformanceCalendarPage = () => {
  const [allPerformances, setAllPerformances] = useState<Performance[]>([]);
  const [filterValues, setFilterValues] = useState<{ visit?: string }>({});
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [myLikeList, setMyLikeList] = useState<string[]>([]); // TODO: API 연동 시 초기값 변경
  const detailRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // TODO: 좋아요 상태 변경 로직을 API 연동으로 교체 예정
  const handleLikeClick = (perf: Performance) => {
    setMyLikeList((prev) => {
      const updated = prev.includes(perf.id)
        ? prev.filter((id) => id !== perf.id)
        : [...prev, perf.id];
      localStorage.setItem('likedPerformanceIds', JSON.stringify(updated));
      return updated;
    });
  };

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
      <PerformanceCalendar
        performances={filteredPerformances}
        selectedDate={selectedDate}
        onSelectedDateChange={setSelectedDate}
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
