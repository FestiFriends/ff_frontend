'use client';

import { useState } from 'react';
import { DateRange } from '@/types/dateRange';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Calendar from '../Calendar/Calendar';

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: DateRange) => void;
  className?: string;
}

const DatePicker = ({
  startDate,
  endDate,
  onChange,
  className,
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate,
    endDate,
  });

  const handleDateClick = (date: Date) => {
    const { startDate, endDate } = selectedRange;

    if (!startDate || (startDate && endDate)) {
      setSelectedRange({ startDate: date, endDate: null });
    } else {
      const earlier = date < startDate ? date : startDate;
      const later = date < startDate ? startDate : date;

      const newRange = { startDate: earlier, endDate: later };
      setSelectedRange(newRange);
      onChange(newRange);
    }
  };

  const prevMonth = subMonths(currentMonth, 1);
  const nextMonth = addMonths(currentMonth, 1);

  return (
    <div className={className}>
      <div className='flex items-center justify-between'>
        <button
          className='cursor-pointer'
          onClick={() => setCurrentMonth(prevMonth)}
        >
          <ChevronLeft />
        </button>
        <span>{format(currentMonth, 'yyyy년 M월', { locale: ko })}</span>
        <button
          className='cursor-pointer'
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
    </div>
  );
};

export default DatePicker;
