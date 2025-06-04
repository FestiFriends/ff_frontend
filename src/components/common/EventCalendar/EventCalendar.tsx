import { useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { isSameMonth } from 'date-fns';
import { isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';

interface EventCalendarProps {
  month: Date;
  performances: Performance[];
  onPerformanceClick?: (performance: Performance) => void;
  onDateClick?: (date: Date, performances: Performance[]) => void;
}
const WEEKDAYS_KR = ['일', '월', '화', '수', '목', '금', '토'];

const EventCalendar = ({
  month,
  performances,
  onPerformanceClick,
  onDateClick,
}: EventCalendarProps) => {
  const [internalMonth, setInternalMonth] = useState(month);
  const currentMonth = internalMonth;

  const days = useMemo(() => {
    const firstDay = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 0,
    });
    const lastDay = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start: firstDay, end: lastDay });
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, Performance[]> = {};

    performances.forEach((perf) => {
      const start = new Date(perf.startDate);
      const end = new Date(perf.endDate);

      const daysInRange = eachDayOfInterval({ start, end });

      daysInRange.forEach((day) => {
        const key = format(day, 'yyyy-MM-dd');
        if (!map[key]) map[key] = [];
        map[key].push(perf);
      });
    });

    return map;
  }, [performances]);

  const handlePrevMonth = () => {
    setInternalMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setInternalMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className='w-full'>
      <div className='mb-2 flex items-center justify-center'>
        <button
          onClick={handlePrevMonth}
          aria-label='이전 달'
        >
          <ChevronLeft size={20} />
        </button>
        <div className='min-w-[120px] text-center font-semibold'>
          {format(currentMonth, 'yyyy년 M월')}
        </div>
        <button
          onClick={handleNextMonth}
          aria-label='다음 달'
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className='mb-1 grid grid-cols-7 border-b border-gray-200 text-center text-sm font-medium text-gray-600'>
        {WEEKDAYS_KR.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const events = eventsByDate[key] ?? [];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);

          return (
            <div
              key={key}
              className={cn(
                'flex min-h-[80px] flex-col items-start justify-between rounded border-b border-gray-200 bg-white p-2',
                !isCurrentMonth && 'text-gray-400',
                isTodayDate && 'border-gray-600 bg-gray-100'
              )}
            >
              <button
                onClick={() => onDateClick?.(day, events)}
                className='w-full text-sm font-medium hover:underline'
              >
                {format(day, 'd')}
              </button>

              {events.length > 0 && (
                <div className='mt-1 space-y-0.5'>
                  {events.slice(0, 2).map((perf) => (
                    <button
                      key={perf.id}
                      onClick={() => onPerformanceClick?.(perf)}
                      className='block w-full truncate rounded bg-blue-100 px-1 text-left text-xs text-blue-700 hover:underline'
                    >
                      {perf.title}
                    </button>
                  ))}
                  {events.length > 2 && (
                    // TODO: 검색 페이지(/search) 구현 후, 해당 날짜로 이동할 수 있도록 연결할 것
                    <div className='text-xs text-gray-400'>
                      +{events.length - 2}개 더 있음
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
