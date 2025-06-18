import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { LabeledWrapper } from '@/components/pages/createGroup';

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  children: (field: FieldValues) => React.ReactNode;
  contentPosition?: 'bottom' | 'right';
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  children,
  contentPosition = 'bottom',
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <LabeledWrapper
        label={label}
        contentPosition={contentPosition}
      >
        {children(field)}
      </LabeledWrapper>
    )}
  />
);

export default FormField;
