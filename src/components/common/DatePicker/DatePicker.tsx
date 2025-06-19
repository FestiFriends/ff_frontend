'use client';

import { useCallback, useRef, useState } from 'react';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar } from '@/components/common';
import { AltArrowUpIcon, DeleteIcon } from '@/components/icons';
import { useClickOutside } from '@/hooks';
import { cn } from '@/lib/utils';
import { DateRange } from '@/types/dateRange';

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
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 transition-all select-none',

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
          <span className='text-14_M leading-normal tracking-[-0.35px]'>
            {placeholder}
          </span>
        ) : (
          <div className='flex w-full items-center gap-1'>
            {startDate && (
              <span className='text-14_M leading-normal tracking-[-0.35px]'>
                {format(startDate, 'MM/dd', { locale: ko })}
              </span>
            )}
            {endDate && (
              <>
                <span className='text-14_M leading-normal tracking-[-0.35px]'>
                  -
                </span>
                <span className='text-14_M leading-normal tracking-[-0.35px]'>
                  {format(endDate, 'MM/dd', { locale: ko })}
                </span>
              </>
            )}
          </div>
        )}
        {startDate || endDate ? (
          <DeleteIcon className='aspect-square h-4 w-4 text-white' />
        ) : (
          <AltArrowUpIcon
            className={`aspect-square h-4 w-4 ${isOpen ? 'text-white' : 'rotate-180 text-gray-950'}`}
          />
        )}
      </button>

      {isOpen && (
        <div className='fixed top-1/2 left-1/2 z-20 inline-flex w-[calc(100vw-1rem)] max-w-[350px] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white p-5'>
          <div className='flex items-center justify-center gap-2'>
            <button
              className='cursor-pointer'
              aria-label='prev month'
              onClick={() => setCurrentMonth(prevMonth)}
            >
              <AltArrowUpIcon className='aspect-square h-6 w-6 -rotate-90 text-gray-950' />
            </button>
            <span className='text-20_B leading-normal tracking-[-0.5px] text-gray-950'>
              {format(currentMonth, 'yyyy년 M월', { locale: ko })}
            </span>
            <button
              className='cursor-pointer'
              aria-label='next month'
              onClick={() => setCurrentMonth(nextMonth)}
            >
              <AltArrowUpIcon className='aspect-square h-6 w-6 rotate-90 text-gray-950' />
            </button>
          </div>
          <Calendar
            month={currentMonth}
            startDate={selectedRange.startDate}
            endDate={selectedRange.endDate}
            onDateClick={handleDateClick}
            className='flex flex-col gap-1'
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
