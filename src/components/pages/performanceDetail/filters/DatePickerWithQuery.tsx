'use client';

import { useEffect, useState } from 'react';
import { addMonths, format, isAfter, isBefore, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/common';
import { AltArrowUpIcon, DeleteIcon, XIcon } from '@/components/icons';
import CalendarWithQuery from '@/components/pages/performanceDetail/filters/CalendarWithQuery';
import { cn } from '@/lib/utils';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from '../../../common/Modal';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: startDate,
    end: endDate,
  });

  useEffect(() => {
    setSelectedRange({
      start: startDate,
      end: endDate,
    });
  }, [startDate, endDate]);

  const handleSelectDate = (date: Date) => {
    const { start, end } = selectedRange;
    const formattedDate = format(date, 'yyyy-MM-dd');

    if (start === null) {
      const newRange = { start: formattedDate, end: null };
      setSelectedRange(newRange);
    } else if (start !== null && end !== null) {
      const newRange = { start: formattedDate, end: null };
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

  const triggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white px-5 py-3 whitespace-nowrap transition-all select-none',

    // pending style
    isPending && 'cursor-not-allowed',

    // opened, selected style
    (isOpen || startDate || endDate) && 'border-gray-950 bg-gray-950 text-white'
  );

  return (
    <Modal>
      <ModalTrigger className={triggerClasses}>
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
        {(startDate || endDate) && (
          <DeleteIcon className='aspect-square h-4 w-4 text-white' />
        )}
      </ModalTrigger>

      <ModalContent className='w-[calc(100%-1rem)] max-w-[375px] rounded-[12px] bg-white px-3.5 py-5'>
        <ModalClose>
          <button className='top-2.5 right-2.5 ring-0 focus:ring-0'>
            <XIcon className='aspect-auto h-7 w-7 shrink-0 text-gray-950' />
          </button>
        </ModalClose>

        <div
          aria-label='datepicker-calendar'
          className='flex flex-col gap-3'
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

          <div className='mt-1 flex gap-2.5'>
            <ModalCancel>
              <Button
                variant='secondary'
                onClick={handleResetDate}
              >
                <span className='text-14_M leading-normal tracking-[-0.5px]'>
                  초기화
                </span>
              </Button>
            </ModalCancel>
            <ModalAction>
              <Button
                variant='primary'
                onClick={handleSubmitDate}
              >
                <span className='text-14_M leading-normal tracking-[-0.5px]'>
                  선택 완료
                </span>
              </Button>
            </ModalAction>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DatePickerWithQuery;
