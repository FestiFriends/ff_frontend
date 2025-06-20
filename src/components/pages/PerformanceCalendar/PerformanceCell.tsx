'use client';

import { memo, useCallback } from 'react';
import { format, isSameMonth, isToday, isSameDay, getDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import PerformanceHoverCard from './PerformanceHoverCard';

interface PerformanceCellProps {
  date: Date;
  performances: Performance[];
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

const PerformanceCell = ({
  date,
  performances,
  currentMonth,
  selectedDate,
  onDateClick,
  onPerformanceClick,
}: PerformanceCellProps) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isTodayDate = isToday(date);
  const isSelected = selectedDate && isSameDay(date, selectedDate);

  const dayOfWeek = getDay(date);

  const dayColorClass =
    dayOfWeek === 0
      ? 'text-red-500'
      : dayOfWeek === 6
        ? 'text-blue-500'
        : 'text-gray-800';

  const handleClick = useCallback(() => {
    onDateClick?.(date, performances, false);
  }, [onDateClick, date, performances]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onDateClick?.(date, performances, false);
      }
    },
    [onDateClick, date, performances]
  );

  const cellBase =
    'flex min-h-[100px] flex-col items-center justify-start overflow-hidden rounded border-b bg-white p-2';

  const cellClasses = cn(
    cellBase,
    'border-gray-200',
    !isCurrentMonth && 'text-gray-400',
    isTodayDate && 'border-gray-600 bg-gray-50',
    isSelected && 'border-red-400 bg-red-50'
  );

  return (
    <div
      role='button'
      tabIndex={0}
      className={cellClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <button
        className={cn('w-full rounded text-12_M font-medium', dayColorClass)}
      >
        {format(date, 'd')}
      </button>
      {performances.length > 0 && (
        <div className='mt-1 flex w-full flex-col space-y-0.5'>
          {performances.slice(0, 2).map((perf) => (
            <PerformanceHoverCard
              key={perf.id}
              performance={perf}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPerformanceClick?.(perf);
                }}
                className={cn(
                  'block w-full truncate overflow-hidden rounded px-1 text-left text-xs text-ellipsis whitespace-nowrap hover:underline',
                  visitStyles[perf.visit] || 'bg-gray-100 text-gray-700'
                )}
              >
                {perf.title}
              </button>
            </PerformanceHoverCard>
          ))}
          {performances.length > 2 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDateClick?.(date, performances, true);
              }}
              className='w-fit text-xs text-gray-400 hover:underline'
            >
              +{performances.length - 2}개
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(PerformanceCell);
