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

  return (
    <div className={className}>
      <div className='space-y-4'>
        <MultiSlider
          min={20}
          max={80}
          step={1}
          value={field.value || [20, 80]}
          onChange={field.onChange}
          valuePosition='none'
          marks={AGE_MARKS}
        />
      </div>

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

export default AgeRangeSlider;
