'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, BottomSheetModal, Button } from '@/components/common';
import { useModalContext } from '@/components/common/Modal/ModalContext';
import BlankIcon from '@/components/icons/BlankIcon';
import { cn } from '@/lib/utils';
import { DateRange } from '@/types/dateRange';

interface NormalDateSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
  triggerClassName?: string;
}

const DateSelectorContent = ({
  value,
  tempStart,
  handleDateClick,
  handleReset,
}: {
  value: DateRange;
  tempStart: Date | null;
  handleDateClick: (date: Date) => void;
  handleReset: () => void;
}) => {
  const { closeModal } = useModalContext();

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <>
      <div className='p-6'>
        <Calendar
          isControllable
          startDate={tempStart || value.startDate}
          endDate={tempStart ? null : value.endDate}
          onDateClick={handleDateClick}
          className='mb-4 flex flex-col gap-1'
        />
      </div>
      {value && (
        <div className='flex justify-between gap-2.5 px-4 pb-4'>
          <Button
            onClick={handleReset}
            variant='secondary'
          >
            초기화
          </Button>
          <Button onClick={handleConfirm}>선택 완료</Button>
        </div>
      )}
    </>
  );
};

const NormalDateSelector: React.FC<NormalDateSelectorProps> = ({
  value,
  onChange,
  className,
  triggerClassName,
}) => {
  const [tempStart, setTempStart] = useState<Date | null>(null);

  const dateRange: DateRange = value || { startDate: null, endDate: null };

  const handleDateClick = (date: Date) => {
    if (!tempStart) {
      setTempStart(date);
    } else {
      let start = tempStart;
      let end = date;
      if (start > end) [start, end] = [end, start];
      onChange({ startDate: start, endDate: end });
      setTempStart(null);
    }
  };

  const handleReset = () => {
    onChange({ startDate: null, endDate: null });
    setTempStart(null);
  };

  const formatDisplay = () => {
    const { startDate, endDate } = dateRange;
    if (startDate && !endDate)
      return format(startDate, 'yyyy.MM.dd', { locale: ko });
    if (startDate && endDate) {
      return `${format(startDate, 'yyyy.MM.dd', { locale: ko })} - ${format(
        endDate,
        'yyyy.MM.dd',
        { locale: ko }
      )}`;
    }
  };

  const displayText = formatDisplay();
  const hasSelection = Boolean(dateRange.startDate || dateRange.endDate);

  const TriggerButton = ({ onClick }: { onClick?: () => void }) => (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-2xl border bg-white px-5 py-3 text-16_M',
        'hover:bg-gray-100 focus:ring-2 focus:outline-none',
        triggerClassName
      )}
    >
      <span className={cn(hasSelection ? 'text-gray-950' : 'text-gray-400')}>
        {displayText}
      </span>
      <BlankIcon className='flex-shrink-0' />
    </button>
  );

  return (
    <div className={className}>
      <div className='mb-2.5 text-14_B text-black'>날짜</div>
      <BottomSheetModal
        trigger={<TriggerButton />}
        height='auto'
        hasHandle={false}
        hasClose={false}
      >
        <DateSelectorContent
          value={dateRange}
          tempStart={tempStart}
          handleDateClick={handleDateClick}
          handleReset={handleReset}
        />
      </BottomSheetModal>
    </div>
  );
};

export default NormalDateSelector;
