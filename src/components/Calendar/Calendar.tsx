import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
} from 'date-fns';

interface CalendarProps {
  month?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateClick?: (date: Date) => void;
  className?: string;
}

const WEEKDAYS_KR = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({
  month = new Date(),
  startDate,
  endDate,
  onDateClick,
  className,
}: CalendarProps) => {
  const days = useMemo(() => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const daysInMonth = eachDayOfInterval({ start, end });

    const startWeekDay = start.getDay();
    const emptyDays = Array.from({ length: startWeekDay }, () => null);

    return [...emptyDays, ...daysInMonth];
  }, [month]);

  const renderDay = (day: Date | null, index: number) => {
    if (day === null) return <div key={`empty-${index}`}></div>;

    const isStart = startDate && isSameDay(day, startDate);
    const isEnd = endDate && isSameDay(day, endDate);
    const isRange =
      startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate);

    // TODO: 디자인 시안 나오면 스타일 수정 필요
    const dayClasses = cn(
      // default style
      'flex items-center justify-center rounded-full',

      // clickable style
      onDateClick && 'cursor-pointer',

      // startDate style
      isStart && 'bg-blue-500 text-white',

      // endDate style
      isEnd && 'bg-blue-500 text-white',

      // rangeDate style
      isRange && 'bg-blue-100 text-blue-700'
    );

    return (
      <button
        key={day.toISOString()}
        onClick={() => onDateClick?.(day)}
        className={dayClasses}
      >
        <span>{format(day, 'd')}</span>
      </button>
    );
  };

  const calendarClasses = cn('w-full', className);

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  return (
    <div className={calendarClasses}>
      <div className='text-center'></div>
      <div className='grid grid-cols-7 place-items-center gap-1 text-center'>
        {WEEKDAYS_KR.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className='grid grid-cols-7 place-items-center gap-1 text-center'>
        {days.map((day, index) => renderDay(day, index))}
      </div>
    </div>
  );
};

export default Calendar;
