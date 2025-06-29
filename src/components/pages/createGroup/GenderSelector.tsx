import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { FormButtonGroup } from '@/components/common/Form';
import { GenderLabels } from '@/constants/genderLabels';

interface GenderSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
}

const GenderSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  className,
}: GenderSelectorProps<TFieldValues, TName>) => {
  const genders = Object.values(GenderLabels);

  return (
    <div className={className}>
      <FormButtonGroup
        name={name}
        control={control}
        options={genders}
        rules={rules}
      />
    </div>
  );
};

export default GenderSelector;
