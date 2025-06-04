import { useMemo } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Performance } from '@/types/performance';

interface EventCalendarProps {
  month: Date;
  performances: Performance[];
  onPerformanceClick?: (performance: Performance) => void;
  onDateClick?: (date: Date, performances: Performance[]) => void;
}

const EventCalendar = ({
  month,
  performances,
  onPerformanceClick,
  onDateClick,
}: EventCalendarProps) => {
  const days = useMemo(() => {
    const firstDay = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
    const lastDay = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });

    return eachDayOfInterval({ start: firstDay, end: lastDay });
  }, [month]);

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

  return (
    <div className='grid grid-cols-7 gap-1'>
      {days.map((day) => {
        const key = format(day, 'yyyy-MM-dd');
        const events = eventsByDate[key] ?? [];

        return (
          <div
            key={key}
            className='rounded border p-2 text-center'
          >
            <div>{format(day, 'd')}</div>

            {/* 공연 제목 또는 개수 */}
            {events.length > 0 && (
              <div className='mt-1 inline-block rounded bg-blue-100 px-1 text-xs text-blue-600'>
                공연 {events.length}개
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EventCalendar;
