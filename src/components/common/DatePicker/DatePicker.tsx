'use client';

import { useCallback, useRef, useState } from 'react';
import AltArrowDownIcon from '@/components/icons/AltArrowDownIcon';
import AltArrowUpIcon from '@/components/icons/AltArrowUpIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import useClickOutside from '@/hooks/useClickOutside/useClickOutside';
import { cn } from '@/lib/utils';
import { DateRange } from '@/types/dateRange';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Calendar from '../Calendar/Calendar';

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  placeholder?: string;
  onChange: (range: DateRange) => void;
}

const DatePicker = ({
  startDate,
  endDate,
  placeholder = '날짜',
  onChange,
}: DatePickerProps) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate,
    endDate,
  });

  useClickOutside({ ref: datePickerRef, onClose: () => setIsOpen(false) });

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDateClick = useCallback(
    (date: Date) => {
      const { startDate, endDate } = selectedRange;

      if (!startDate) {
        const newRange = { startDate: date, endDate: null };
        setSelectedRange(newRange);
        onChange(newRange);
      } else if (startDate && endDate) {
        const newRange = { startDate: null, endDate: null };
        setSelectedRange(newRange);
        onChange(newRange);
        setIsOpen(false);
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

  const datePickerTriggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5',

    // opened, selected style
    (isOpen || startDate || endDate) && 'border-gray-950 bg-gray-950 text-white'
  );

  return (
    <div
      ref={datePickerRef}
      className='relative inline-block'
    >
      <button
        aria-label='datepicker open'
        onClick={toggleDatePicker}
        className={datePickerTriggerClasses}
      >
        {!startDate && !endDate ? (
          <span>{placeholder}</span>
        ) : (
          <div className='flex w-full items-center gap-1'>
            {startDate && (
              <span>{format(startDate, 'MM/dd', { locale: ko })}</span>
            )}
            {endDate && (
              <>
                <span>-</span>
                <span>{format(endDate, 'MM/dd', { locale: ko })}</span>
              </>
            )}
          </div>
        )}
        {isOpen ? (
          <AltArrowUpIcon className='aspect-square h-4 w-4 text-white' />
        ) : startDate || endDate ? (
          <DeleteIcon className='aspect-square h-4 w-4 text-white' />
        ) : (
          <AltArrowDownIcon className='aspect-square h-4 w-4 text-gray-950' />
        )}
      </button>

      {isOpen && (
        <div className='absolute z-10 w-48 overflow-hidden bg-white'>
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
        </div>
      )}
    </div>
  );
};

export default DatePicker;
