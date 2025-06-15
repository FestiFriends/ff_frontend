import { useMemo, useState } from 'react';
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
import AltArrowUpIcon from '@/components/icons/AltArrowUpIcon';
import { cn } from '@/lib/utils';

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

    const dayClasses = cn(
      // default style
      'flex aspect-square h-12.5 w-12.5 items-center justify-center bg-white',
      'text-base font-medium tracking-[-0.4px] text-gray-800',

      // prevMonthDate, nextMonthDate style
      !isCurrentMonth && 'text-gray-300',

      isStart
        && endDate
        && 'rounded-tl-[100px] rounded-bl-[100px] bg-primary-100',

      isEnd
        && startDate
        && 'rounded-tr-[100px] rounded-br-[100px] bg-primary-100',

      // rangeDate style
      isRange && 'bg-primary-100'
    );

    const dayButtonClasses = cn(
      'h-full w-full',

      // clickable style
      onDateClick && 'cursor-pointer',

      // startDate style
      isStart && 'z-10 rounded-[100px] bg-primary-red font-bold text-white',

      // endDate style
      isEnd && 'z-10 rounded-[100px] bg-primary-red font-bold text-white'
    );

    return (
      <div
        key={day.toISOString()}
        className={dayClasses}
      >
        <button
          onClick={() => onDateClick?.(day)}
          className={dayButtonClasses}
        >
          <span>{format(day, 'd')}</span>
        </button>
      </div>
    );
  };

  const calendarClasses = cn('w-full', className);

  return (
    <div className={calendarClasses}>
      {isControllable && (
        <div className='flex items-center justify-center gap-2'>
          <button
            className='cursor-pointer'
            aria-label='prev month'
            onClick={handlePrevMonth}
          >
            <AltArrowUpIcon className='aspect-square h-6 w-6 -rotate-90 text-gray-950' />
          </button>
          <span className='text-20_B leading-normal tracking-[-0.5px] text-gray-950'>
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </span>
          <button
            className='cursor-pointer'
            aria-label='next month'
            onClick={handleNextMonth}
          >
            <AltArrowUpIcon className='aspect-square h-6 w-6 rotate-90 text-gray-950' />
          </button>
        </div>
      )}
      <div className='grid grid-cols-7 place-items-center text-center'>
        {WEEKDAYS_KR.map((d) => (
          <div
            key={d}
            className='flex aspect-square h-12.5 w-12.5 items-center justify-center bg-white p-2.5'
          >
            <span className='text-base leading-[26px] font-semibold tracking-[-0.4px] text-gray-800'>
              {d}
            </span>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 place-items-center gap-y-2 text-center'>
        {days.map((day, index) => renderDay(day, index))}
      </div>
    </div>
  );
};

export default Calendar;
