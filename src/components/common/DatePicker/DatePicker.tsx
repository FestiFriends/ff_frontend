'use client';

import { useCallback, useState } from 'react';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DateRange } from '@/types/dateRange';
import Calendar from '../Calendar/Calendar';
import Popover from '../Popover/Popover';
import PopoverContent from '../Popover/PopoverContent';
import PopoverTrigger from '../Popover/PopoverTrigger';

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: DateRange) => void;
}

const DatePicker = ({ startDate, endDate, onChange }: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate,
    endDate,
  });

  const handleDateClick = useCallback(
    (date: Date) => {
      const { startDate, endDate } = selectedRange;

      if (!startDate || (startDate && endDate)) {
        const newRange = { startDate: date, endDate: null };
        setSelectedRange(newRange);
        onChange(newRange);
      } else {
        const earlier = date < startDate ? date : startDate;
        const later = date < startDate ? startDate : date;

        const newRange = { startDate: earlier, endDate: later };
        setSelectedRange(newRange);
        onChange(newRange);
      }
    },
    [selectedRange, onChange]
  );

  const prevMonth = subMonths(currentMonth, 1);
  const nextMonth = addMonths(currentMonth, 1);

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  return (
    <Popover>
      <PopoverTrigger>
        <button className='flex cursor-pointer items-center gap-1 rounded border'>
          <CalendarIcon />
          {!startDate && !endDate ? (
            <span>날짜를 선택하세요</span>
          ) : (
            <div className='flex items-center gap-1'>
              {startDate && (
                <span>
                  {format(startDate, 'yyyy년 M월 d일', { locale: ko })}
                </span>
              )}
              {endDate && (
                <>
                  <span>-</span>
                  <span>
                    {format(endDate, 'yyyy년 M월 d일', { locale: ko })}
                  </span>
                </>
              )}
            </div>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className='left-0 translate-0'>
        <div className='flex items-center justify-center gap-1'>
          <button
            className='cursor-pointer'
            aria-label='prev month'
            onClick={() => setCurrentMonth(prevMonth)}
          >
            <ChevronLeft />
          </button>
          <span>{format(currentMonth, 'yyyy년 M월', { locale: ko })}</span>
          <button
            className='cursor-pointer'
            aria-label='next month'
            onClick={() => setCurrentMonth(nextMonth)}
          >
            <ChevronRight />
          </button>
        </div>
        <Calendar
          month={currentMonth}
          startDate={selectedRange.startDate}
          endDate={selectedRange.endDate}
          onDateClick={handleDateClick}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
