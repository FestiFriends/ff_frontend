import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { FormButtonGroup } from '@/components/common/Form';

interface CategorySelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
}

const CategorySelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  className,
}: CategorySelectorProps<TFieldValues, TName>) => {
  const categories = ['동행', '탑승', '숙박'];

  return (
    <div className={className}>
      <FormButtonGroup
        name={name}
        control={control}
        options={categories}
        rules={rules}
      />
    </div>
  );
};

export default CategorySelector;
