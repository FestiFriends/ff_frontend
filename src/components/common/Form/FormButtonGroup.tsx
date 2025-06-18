import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { ButtonGroup, ButtonGroupItem } from '@/components/common/ButtonGroup';
import { useStyles } from '@/hooks';

interface FormButtonGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  options: string[];
  rules?: RegisterOptions<TFieldValues, TName>;
  disabled?: boolean;
  className?: string;
}

const FormButtonGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  options,
  rules,
  disabled = false,
  className,
}: FormButtonGroupProps<TFieldValues, TName>) => {
  const { getButtonClasses } = useStyles();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  // 빈 배열이나 잘못된 props 처리
  if (!options || options.length === 0) {
    console.warn('FormButtonGroup: options prop is empty or undefined');
    return null;
  }

  return (
    <div className={className}>
      <ButtonGroup
        mode='single'
        value={value || ''}
        onChange={(newValue) => onChange(newValue as string)}
        disabled={disabled}
      >
        <div
          className='flex gap-2'
          role='radiogroup'
        >
          {options.map((option) => (
            <ButtonGroupItem
              key={option}
              value={option}
              className={getButtonClasses(value === option)}
            >
              {option}
            </ButtonGroupItem>
          ))}
        </div>
      </ButtonGroup>
      {error && (
        <p
          className='mt-1 text-sm text-red-500'
          role='alert'
          aria-live='polite'
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormButtonGroup;
