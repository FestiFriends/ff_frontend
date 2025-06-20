import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
  disabled?: boolean;
  className?: string;
}

const FormTextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  placeholder,
  rules,
  disabled = false,
  className,
}: FormTextInputProps<TFieldValues, TName>) => {
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
      <input
        {...field}
        type='text'
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full rounded-2xl border px-5 py-4 focus:border-transparent focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:bg-gray-100',
          error ? 'border-red-500' : 'border-gray-100'
        )}
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

export default FormTextInput;
