import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { DatePicker } from '@/components/common';
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
}: DateSelectorProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const dateRange: DateRange = field.value || {
    startDate: null,
    endDate: null,
  };

  const handleDateChange = (range: DateRange) => {
    field.onChange(range);
  };

  return (
    <div className={className}>
      <DatePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        placeholder={placeholder}
        onChange={handleDateChange}
      />

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
