'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { format, parse, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import Calendar from '@/components/common/Calendar/Calendar';
import AltArrowUpIcon from '@/components/icons/AltArrowUpIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import useClickOutside from '@/hooks/useClickOutside/useClickOutside';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { cn } from '@/lib/utils';
import { DateRange } from '@/types/dateRange';

interface PerformanceDatePickerProps {
  startDateKey?: string;
  endDateKey?: string;
  dateFormat?: string;
  resetPage?: boolean;
  className?: string;
}

const parseDate = (
  dateString: string | null,
  dateFormat: string
): Date | null => {
  if (!dateString || dateString === 'undefined' || dateString.trim() === '') {
    return null;
  }

  try {
    const parsed = parse(dateString, dateFormat, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const formatDate = (date: Date | null, dateFormat: string): string | null => {
  if (!date || !isValid(date)) {
    return null;
  }
  return format(date, dateFormat);
};

const PerformanceDatePicker = ({
  startDateKey = 'startDate',
  endDateKey = 'endDate',
  dateFormat = 'yyyy-MM-dd',
  resetPage = true,
  className,
}: PerformanceDatePickerProps) => {
  const { getQueryParam, setMultipleQueryParams } = useQueryParam();
  const datePickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  useClickOutside({ ref: datePickerRef, onClose: () => setIsOpen(false) });

  const loadDateParams = () => {
    const startDateParam = getQueryParam(startDateKey);
    const endDateParam = getQueryParam(endDateKey);

    const startDate = parseDate(startDateParam, dateFormat);
    const endDate = parseDate(endDateParam, dateFormat);

    setDateRange({
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    loadDateParams();
  }, [startDateKey, endDateKey, dateFormat]);

  const toggleDatePicker = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleDateClick = useCallback(
    (date: Date) => {
      const { startDate, endDate } = dateRange;

      let newRange: DateRange;

      if (!startDate) {
        newRange = { startDate: date, endDate: null };
      } else if (startDate && endDate) {
        newRange = { startDate: null, endDate: null };
      } else {
        const earlier = date < startDate ? date : startDate;
        const later = date < startDate ? startDate : date;
        newRange = { startDate: earlier, endDate: later };
      }

      setDateRange(newRange);

      const queryParams: Record<string, string | null> = {
        [startDateKey]: formatDate(newRange.startDate, dateFormat),
        [endDateKey]: formatDate(newRange.endDate, dateFormat),
      };

      if (resetPage) {
        queryParams.page = '1';
      }

      setMultipleQueryParams(queryParams);
    },
    [
      dateRange,
      startDateKey,
      endDateKey,
      dateFormat,
      resetPage,
      setMultipleQueryParams,
    ]
  );

  const handleReset = useCallback(() => {
    setDateRange({
      startDate: null,
      endDate: null,
    });

    const queryParams: Record<string, string | null> = {
      [startDateKey]: null,
      [endDateKey]: null,
    };

    if (resetPage) {
      queryParams.page = '1';
    }

    setMultipleQueryParams(queryParams);
  }, [startDateKey, endDateKey, resetPage, setMultipleQueryParams]);

  const datePickerTriggerClasses = cn(
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap transition-all select-none',
    (isOpen || dateRange.startDate || dateRange.endDate)
      && 'border-gray-950 bg-gray-950 text-white'
  );

  const isDateSelected =
    dateRange.startDate !== null || dateRange.endDate !== null;

  return (
    <div
      ref={datePickerRef}
      className={cn('relative inline-block', className)}
    >
      <button
        ref={buttonRef}
        aria-label='datepicker open'
        onClick={toggleDatePicker}
        className={datePickerTriggerClasses}
      >
        {!dateRange.startDate && !dateRange.endDate ? (
          <span className='text-14_M leading-normal tracking-[-0.35px]'>
            날짜
          </span>
        ) : (
          <div className='flex w-full items-center gap-1'>
            {dateRange.startDate && (
              <span className='text-14_M leading-normal tracking-[-0.35px]'>
                {format(dateRange.startDate, 'MM/dd', { locale: ko })}
              </span>
            )}
            {dateRange.endDate && (
              <>
                <span className='text-14_M leading-normal tracking-[-0.35px]'>
                  -
                </span>
                <span className='text-14_M leading-normal tracking-[-0.35px]'>
                  {format(dateRange.endDate, 'MM/dd', { locale: ko })}
                </span>
              </>
            )}
          </div>
        )}
        {dateRange.startDate || dateRange.endDate ? (
          <DeleteIcon className='aspect-square h-4 w-4 text-white' />
        ) : (
          <AltArrowUpIcon
            className={`aspect-square h-4 w-4 ${isOpen ? 'text-white' : 'rotate-180 text-gray-950'}`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className='fixed z-[9999] inline-flex w-[calc(100vw-2rem)] -translate-x-1/2 flex-col gap-5 overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white p-5 shadow-lg'
          style={{
            top: `${buttonPosition.top + 8}px`,
            left: '50%',
          }}
        >
          <Calendar
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateClick={handleDateClick}
            isControllable={true}
            className='flex flex-col gap-1'
          />
        </div>
      )}

      {isDateSelected && (
        <button
          onClick={handleReset}
          className='ml-2 text-sm text-gray-600 hover:text-gray-800'
        >
          초기화
        </button>
      )}
    </div>
  );
};

export default PerformanceDatePicker;
