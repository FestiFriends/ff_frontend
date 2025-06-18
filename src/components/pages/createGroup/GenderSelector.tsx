import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { FormButtonGroup } from '@/components/common/Form';

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
  // TODO: gender 타입은 이넘으로, const에 키벨류 만들고 연결 필요
  const genders = ['여성', '남성', '혼성'];

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
