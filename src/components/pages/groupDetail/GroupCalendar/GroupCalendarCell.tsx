'use client';

import { memo, useCallback } from 'react';
import { format, isSameMonth, isToday, isSameDay } from 'date-fns';
import { EVENT_COLOR_STYLE_MAP } from '@/constants/eventColors';
import { cn } from '@/lib/utils';
import { Schedule } from '@/types/group';

interface GroupCellProps {
  date: Date;
  schedules: Schedule[];
  currentMonth: Date;
  selectedDate?: Date | null;
  onDateClick?: (
    date: Date,
    schedules: Schedule[],
    openCreator?: boolean
  ) => void;
  onScheduleClick?: (schedule: Schedule) => void;
}

const GroupCalendarCell = ({
  date,
  schedules,
  currentMonth,
  selectedDate,
  onDateClick,
  onScheduleClick,
}: GroupCellProps) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isTodayDate = isToday(date);
  const isSelected = selectedDate && isSameDay(date, selectedDate);

  const handleDateClick = useCallback(() => {
    onDateClick?.(date, schedules, false);
  }, [onDateClick, date, schedules]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onDateClick?.(date, schedules, false);
      }
    },
    [onDateClick, date, schedules]
  );

  const cellClasses = cn(
    'flex min-h-[100px] flex-col items-start justify-start overflow-hidden rounded border-b bg-white p-2',
    'border-gray-200',
    !isCurrentMonth && 'text-gray-400',
    isTodayDate && 'border-gray-600 bg-gray-50',
    isSelected && 'border-blue-400 bg-blue-50'
  );

  return (
    <div
      role='button'
      tabIndex={0}
      className={cellClasses}
      onClick={handleDateClick}
      onKeyDown={handleKeyDown}
    >
      <div className='text-sm font-medium'>{format(date, 'd')}</div>

      {schedules.length > 0 && (
        <div className='mt-1 flex w-full flex-col space-y-0.5'>
          {schedules.slice(0, 2).map((schedule) => {
            const color = EVENT_COLOR_STYLE_MAP[schedule.eventColor ?? 'red'];
            return (
              <button
                key={schedule.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onScheduleClick?.(schedule);
                }}
                className={cn(
                  'block w-full truncate rounded px-1 text-left text-xs hover:underline',
                  color.bgClass,
                  color.textClass
                )}
              >
                {schedule.description}
              </button>
            );
          })}
          {schedules.length > 2 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDateClick?.(date, schedules, true);
              }}
              className='text-xs text-gray-400 hover:underline'
            >
              +{schedules.length - 2}개
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(GroupCalendarCell);
