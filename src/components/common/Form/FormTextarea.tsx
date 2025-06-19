import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

interface FormTextAreaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  rows?: number;
  rules?: RegisterOptions<TFieldValues, TName>;
  disabled?: boolean;
  className?: string;
}

const FormTextArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  placeholder,
  rows = 4,
  rules,
  disabled = false,
  className,
}: FormTextAreaProps<TFieldValues, TName>) => {
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
      <textarea
        {...field}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className='w-full resize-none rounded-2xl border border-gray-100 px-5 py-4 focus:border-transparent focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:bg-gray-100'
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

export default FormTextArea;
