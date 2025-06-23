'use client';

import { memo, useCallback } from 'react';
import { format, isSameMonth, isToday, isSameDay, getDay } from 'date-fns';
import { EVENT_COLOR_STYLE_MAP } from '@/constants/eventColors';
import { cn } from '@/lib/utils';
import { GroupSchedule } from '@/types/group';

interface GroupCellProps {
  date: Date;
  schedules: GroupSchedule[];
  currentMonth: Date;
  selectedDate?: Date | null;
  onDateClick?: (
    date: Date,
    schedules: GroupSchedule[],
    openCreator?: boolean
  ) => void;
  onScheduleClick?: (schedule: GroupSchedule) => void;
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

  const dayOfWeek = getDay(date);

  const dayColorClass =
    dayOfWeek === 0
      ? 'text-red-500'
      : dayOfWeek === 6
        ? 'text-blue-500'
        : 'text-gray-800';

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
    'flex min-h-[100px] flex-col items-center justify-start overflow-visible rounded border-b bg-white p-2',
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
      <div className={cn('rounded !text-12_M', dayColorClass)}>
        {format(date, 'd')}
      </div>

      {schedules.length > 0 && (
        <div className='mt-2 flex w-full flex-col items-center space-y-1'>
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
                  'block w-full max-w-[60px] truncate rounded px-1 py-[2px] text-center !text-12_M',
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
              className='mx-auto block w-fit text-12_M text-gray-400'
            >
              +{schedules.length - 2}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(GroupCalendarCell);
