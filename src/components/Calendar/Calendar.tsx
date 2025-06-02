import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  month?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateClick?: (date: Date) => void;
  isControllable?: boolean;
  className?: string;
}

const WEEKDAYS_KR = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({
  month = new Date(),
  startDate,
  endDate,
  onDateClick,
  isControllable,
  className,
}: CalendarProps) => {
  const [internalMonth, setInternalMonth] = useState<Date>(month);
  const currentMonth = isControllable ? internalMonth : month;

  const days = useMemo(() => {
    const firstDay = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 0,
    });
    const lastDay = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    return eachDayOfInterval({ start: firstDay, end: lastDay });
  }, [currentMonth]);

  const handlePrevMonth = () => {
    if (!isControllable) return;

    setInternalMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    if (!isControllable) return;

    setInternalMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderDay = (day: Date | null, index: number) => {
    if (day === null) return <div key={`empty-${index}`}></div>;

    const isCurrentMonth = isSameMonth(day, currentMonth);
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

      // prevMonthDate, nextMonthDate style
      !isCurrentMonth && 'text-gray-400',

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
      {isControllable && (
        <div className='flex items-center justify-between text-center'>
          <button
            className='cursor-pointer'
            aria-label='이전 달'
            onClick={handlePrevMonth}
          >
            <ChevronLeft />
          </button>
          <span>{format(currentMonth, 'yyyy년 M월', { locale: ko })}</span>
          <button
            className='cursor-pointer'
            aria-label='다음 달'
            onClick={handleNextMonth}
          >
            <ChevronRight />
          </button>
        </div>
      )}
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
