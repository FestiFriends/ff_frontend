'use client';

import { useEffect, useRef, useState } from 'react';
import { addMonths, format, isAfter, isBefore, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button, CalendarWithQuery } from '@/components/common';
import { AltArrowUpIcon, DeleteIcon } from '@/components/icons';
import { useClickOutside } from '@/hooks';
import { cn } from '@/lib/utils';

interface DatePickerWithQueryProps {
  startDate: string | null;
  endDate: string | null;
  placeholder?: string;
  isPending?: boolean;
  onInit?: (keys: string[]) => void;
  onSubmit?: (params: Record<string, string | null>) => void;
}

const DatePickerWithQuery = ({
  startDate,
  endDate,
  placeholder = '날짜',
  isPending,
  onInit,
  onSubmit,
}: DatePickerWithQueryProps) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: startDate,
    end: endDate,
  });

  useClickOutside({ ref: datePickerRef, onClose: () => setIsOpen(false) });

  useEffect(() => {
    setSelectedRange({
      start: startDate,
      end: endDate,
    });
  }, [startDate, endDate]);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectDate = (date: Date) => {
    const { start, end } = selectedRange;
    const formattedDate = format(date, 'yyyy-MM-dd');

    if (start === null) {
      const newRange = { start: formattedDate, end: null };
      setSelectedRange(newRange);
    } else if (start !== null && end !== null) {
      const newRange = { start: null, end: null };
      setSelectedRange(newRange);
    } else {
      const earlier = isBefore(formattedDate, start) ? formattedDate : start;
      const later = isAfter(formattedDate, start) ? formattedDate : start;

      const newRange = { start: earlier, end: later };
      setSelectedRange(newRange);
    }
  };

  const handleSubmitDate = () => {
    const dateParams: Record<string, string | null> = {
      ['startDate']: selectedRange.start,
      ['endDate']: selectedRange.end,
    };
    onSubmit?.(dateParams);
    setIsOpen(false);
  };

  const handleResetDate = () => {
    setSelectedRange({ start: null, end: null });
    onInit?.(['startDate', 'endDate']);
  };

  const prevMonth = subMonths(currentMonth, 1);
  const nextMonth = addMonths(currentMonth, 1);

  const datePickerTriggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap transition-all select-none',

    // pending style
    isPending && 'cursor-not-allowed',

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
        disabled={isPending}
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
        <div
          aria-label='datepicker-calendar'
          className='absolute top-full left-0 z-20 mt-2 inline-flex w-[calc(100vw-2rem)] max-w-[390px] flex-col gap-2.5 overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white p-5'
          // className='fixed top-1/2 left-1/2 z-20 inline-flex w-[calc(100vw-1rem)] max-w-[390px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2.5 overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white p-5'
        >
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
          <CalendarWithQuery
            month={currentMonth}
            startDate={selectedRange.start}
            endDate={selectedRange.end}
            onDateClick={handleSelectDate}
            className='flex flex-col gap-1'
          />

          <div className='flex gap-2.5'>
            <Button
              variant='secondary'
              onClick={handleResetDate}
            >
              <span className='text-14_M leading-normal tracking-[-0.5px]'>
                초기화
              </span>
            </Button>
            <Button
              variant='primary'
              onClick={handleSubmitDate}
            >
              <span className='text-14_M leading-normal tracking-[-0.5px]'>
                선택 완료
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerWithQuery;
