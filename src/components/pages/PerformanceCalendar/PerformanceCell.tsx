'use client';

import { memo, useCallback } from 'react';
import { format, isSameMonth, isToday, isSameDay, getDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';
import PerformanceQuickView from './PerformanceQuickView';

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
  내한: 'bg-[#FFF8DD] text-[#FC8A00]',
  국내: 'bg-red-100 text-primary-red',
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
    'flex min-h-[100px] flex-col items-center justify-start overflow-visible rounded border-b bg-white p-2';

  const cellClasses = cn(
    cellBase,
    'border-gray-200',
    !isCurrentMonth && 'opacity-50',
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
      <button className={cn('rounded !text-12_M', dayColorClass)}>
        {format(date, 'd')}
      </button>
      {performances.length > 0 && (
        <div className='mt-2 flex w-full flex-col items-center space-y-1'>
          {performances.slice(0, 2).map((perf) => (
            <PerformanceQuickView
              key={perf.id}
              performance={perf}
            >
              <div
                role='button'
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onPerformanceClick?.(perf);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onPerformanceClick?.(perf);
                  }
                }}
                className={cn(
                  'block w-full max-w-[60px] truncate rounded px-1 py-[2px] text-left !text-12_M',
                  visitStyles[perf.visit] || 'bg-gray-100 text-gray-700'
                )}
              >
                {perf.title}
              </div>
            </PerformanceQuickView>
          ))}
          {performances.length > 2 && (
            <PerformanceQuickView performances={performances.slice(2)}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className='mx-auto block w-fit text-12_M text-gray-400'
              >
                +{performances.length - 2}
              </button>
            </PerformanceQuickView>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(PerformanceCell);
