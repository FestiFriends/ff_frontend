import { memo, useCallback } from 'react';
import { format, isSameMonth, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import { PerformanceHoverCard } from './';

interface CalendarCellProps {
  date: Date;
  events: Performance[];
  currentMonth: Date;
  selectedDate?: Date;
  onDateClick?: (
    date: Date,
    performances: Performance[],
    scroll?: boolean
  ) => void;
  onPerformanceClick?: (performance: Performance) => void;
}

const visitStyles: Record<string, string> = {
  내한: 'bg-green-100 text-green-700',
  국내: 'bg-red-100 text-red-700',
};

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  currentMonth,
  selectedDate,
  onDateClick,
  onPerformanceClick,
}: CalendarCellProps) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isTodayDate = isToday(date);
  const isSelected = selectedDate && isSameDay(date, selectedDate);

  const cellBaseClass =
    'flex min-h-[100px] flex-col items-start justify-start overflow-hidden rounded border-b bg-white p-2';

  const cellClasses = cn(
    cellBaseClass,
    'border-gray-200',
    !isCurrentMonth && 'text-gray-400',
    isTodayDate && 'border-gray-600 bg-gray-50',
    isSelected && 'border-red-400 bg-red-50'
  );

  const handleDateClick = useCallback(() => {
    onDateClick?.(date, events, false);
  }, [onDateClick, date, events]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onDateClick?.(date, events, false);
      }
    },
    [onDateClick, date, events]
  );

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={handleDateClick}
      onKeyDown={handleKeyDown}
      className={cellClasses}
    >
      <button className='w-full rounded text-sm font-medium'>
        {format(date, 'd')}
      </button>

      {events.length > 0 && (
        <div className='mt-1 flex flex-col space-y-0.5'>
          {events.slice(0, 2).map((perf) => (
            <PerformanceHoverCard
              key={perf.id}
              performance={perf}
            >
              <button
                key={perf.id}
                onClick={() => onPerformanceClick?.(perf)}
                className={cn(
                  'block w-full truncate overflow-hidden rounded px-1 text-left text-xs text-ellipsis whitespace-nowrap hover:underline',
                  visitStyles[perf.visit] || 'bg-gray-100 text-gray-700'
                )}
              >
                {perf.title}
              </button>
            </PerformanceHoverCard>
          ))}
          {events.length > 2 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDateClick?.(date, events, true);
              }}
              className='w-fit text-xs text-gray-400 hover:underline'
            >
              +{events.length - 2}개
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const areEqual = (
  prev: Readonly<CalendarCellProps>,
  next: Readonly<CalendarCellProps>
): boolean => {
  const sameDate = isSameDay(prev.date, next.date);
  const sameMonth = isSameMonth(prev.currentMonth, next.currentMonth);
  const sameSelected = Boolean(
    (!prev.selectedDate && !next.selectedDate)
      || (prev.selectedDate
        && next.selectedDate
        && isSameDay(prev.selectedDate, next.selectedDate))
  );
  const sameEvents = prev.events.length === next.events.length;

  return sameDate && sameMonth && sameSelected && sameEvents;
};

export default memo(CalendarCell, areEqual);
