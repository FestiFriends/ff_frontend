import React, { useState } from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, BottomSheetModal } from '@/components/common';
import { AltArrowUpIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { DateRange } from '@/types/dateRange';

interface DateSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
  disabled?: boolean;
  triggerClassName?: string;
}

const DateSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  placeholder = '날짜를 선택해주세요',
  rules,
  className,
  disabled = false,
  triggerClassName,
}: DateSelectorProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);

  const dateRange: DateRange = field.value || {
    startDate: null,
    endDate: null,
  };

  const handleDateClick = (date: Date) => {
    if (!tempStartDate) {
      setTempStartDate(date);
    } else {
      const startDate = tempStartDate;
      const endDate = date;

      if (startDate > endDate) {
        field.onChange({
          startDate: endDate,
          endDate: startDate,
        });
      } else {
        field.onChange({
          startDate,
          endDate,
        });
      }

      setTempStartDate(null);
    }
  };

  const formatDateRange = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${format(dateRange.startDate, 'yyyy.MM.dd', { locale: ko })} - ${format(dateRange.endDate, 'yyyy.MM.dd', { locale: ko })}`;
    }

    if (tempStartDate) {
      return `${format(tempStartDate, 'yyyy.MM.dd', { locale: ko })} - 종료일 선택`;
    }

    return placeholder;
  };

  const getCurrentStartDate = () => tempStartDate || dateRange.startDate;

  const getCurrentEndDate = () => (tempStartDate ? null : dateRange.endDate);

  const handleReset = () => {
    field.onChange({ startDate: null, endDate: null });
    setTempStartDate(null);
  };

  const handleModalClose = () => {
    setTempStartDate(null);
  };

  const displayText = formatDateRange();
  const selectedOption = dateRange.startDate && dateRange.endDate;

  const TriggerButton = ({ onClick }: { onClick?: () => void }) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-2 rounded-2xl border border-gray-100 bg-white px-5 py-4 text-left transition-colors duration-200',
        'hover:bg-gray-50',
        'focus:ring-2',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
        error && 'border-red-300 focus:ring-red-500',
        triggerClassName
      )}
    >
      <span
        className={cn(
          'flex-1 whitespace-nowrap',
          selectedOption ? 'text-gray-900' : 'text-gray-500'
        )}
      >
        {displayText}
      </span>
      <AltArrowUpIcon className='h-6 w-6 flex-shrink-0 rotate-90' />
    </button>
  );

  return (
    <div className={className}>
      <BottomSheetModal
        trigger={<TriggerButton />}
        height='auto'
        hasClose={false}
        hasHandle={false}
        onClose={handleModalClose}
      >
        <div className='p-6'>
          <Calendar
            key={`${dateRange.startDate?.toISOString()}-${dateRange.endDate?.toISOString()}-${tempStartDate?.toISOString()}`}
            isControllable={true}
            startDate={getCurrentStartDate()}
            endDate={getCurrentEndDate()}
            onDateClick={handleDateClick}
            className='mb-4 flex flex-col gap-1'
          />

          <div className='mb-4 flex items-center justify-between text-sm text-gray-600'>
            <span>
              {tempStartDate
                ? '종료일을 선택해주세요'
                : '시작일을 선택해주세요'}
            </span>
            {(dateRange.startDate || dateRange.endDate || tempStartDate) && (
              <button
                type='button'
                onClick={handleReset}
                className='text-red-500 hover:text-red-700'
              >
                초기화
              </button>
            )}
          </div>

          {tempStartDate && (
            <div className='rounded-md bg-blue-50 p-3 text-sm text-blue-700'>
              시작일: {format(tempStartDate, 'yyyy년 M월 d일', { locale: ko })}
            </div>
          )}
        </div>
      </BottomSheetModal>

      {error && (
        <p
          className='mt-1 text-sm text-red-500'
          role='alert'
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default DateSelector;
