import { format, isSameMonth, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Performance } from '@/types/performance';

interface CalendarCellProps {
  date: Date;
  events: Performance[];
  currentMonth: Date;
  selectedDate?: Date;
  onDateClick?: (date: Date, performances: Performance[]) => void;
  onPerformanceClick?: (performance: Performance) => void;
}

const CalendarCell = ({
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

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={() => onDateClick?.(date, events)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onDateClick?.(date, events);
        }
      }}
      className={cn(
        'flex min-h-[90px] flex-col items-start justify-start overflow-hidden rounded border-b border-gray-200 bg-white p-2',
        !isCurrentMonth && 'text-gray-400',
        isTodayDate && 'border-gray-600 bg-gray-50',
        isSelected && 'bg-blue-600 text-white'
      )}
    >
      <button
        className={cn('w-full rounded text-sm font-medium hover:underline')}
      >
        {format(date, 'd')}
      </button>

      {events.length > 0 && (
        <div className='mt-1 space-y-0.5'>
          {events.slice(0, 2).map((perf) => (
            <button
              key={perf.id}
              title={perf.title}
              onClick={() => onPerformanceClick?.(perf)}
              className='block w-full truncate rounded bg-blue-100 px-1 text-left text-xs text-blue-700 hover:underline'
            >
              {perf.title}
            </button>
          ))}
          {events.length > 2 && (
            <div className='text-xs text-gray-400'>+{events.length - 2}개</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
