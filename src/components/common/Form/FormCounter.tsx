'use client';

import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { Counter } from '@/components/common';

interface FormCounterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  min?: number;
  max?: number;
  rules?: RegisterOptions<TFieldValues, TName>;
  suffix?: string;
  className?: string;
}

const FormCounter = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  min = 1,
  max = 100,
  rules,
  suffix,
  className,
}: FormCounterProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={className}>
      <div className='flex items-center space-x-4'>
        <Counter
          value={field.value || min}
          min={min}
          max={max}
          onChange={field.onChange}
        />
        {suffix && <span className='text-sm text-gray-600'>{suffix}</span>}
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

export default FormCounter;
