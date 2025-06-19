'use client';

import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  value: string;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
  showError?: boolean;
}

const FormText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  value,
  rules,
  className,
  showError = true,
}: FormTextProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  React.useEffect(() => {
    field.onChange(value);
  }, [value, field]);

  return (
    <div className={cn('flex flex-col', className)}>
      <span className='text-gray-900'>{value}</span>
      {showError && error && (
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

export default FormText;
