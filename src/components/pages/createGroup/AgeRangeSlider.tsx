import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { MultiSlider } from '@/components/common';

interface AgeRangeSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
}

const AgeRangeSlider = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  className,
}: AgeRangeSliderProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const AGE_MARKS = {
    20: '20대 이하',
    30: '30대',
    40: '40대',
    50: '50대',
    60: '60대',
    70: '70대',
    80: '80대 이상',
  };

  const currentValue = field.value || [20, 80];
  const [minAge, maxAge] = currentValue;

  const formatAgeRange = () => {
    if (minAge === maxAge) {
      return `${minAge}세`;
    }
    return `${minAge}세 - ${maxAge}세`;
  };

  return (
    <div className={className}>
      <div className='space-y-2'>
        <MultiSlider
          min={20}
          max={80}
          step={1}
          value={currentValue}
          onChange={field.onChange}
          valuePosition='none'
          marks={AGE_MARKS}
        />
        <div className='text-center text-xs text-gray-500'>
          {formatAgeRange()}
        </div>
      </div>

      {error && (
        <p
          className='mt-1 text-sm text-primary-red'
          role='alert'
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default AgeRangeSlider;
