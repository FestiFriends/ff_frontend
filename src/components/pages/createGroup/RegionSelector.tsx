import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { LocationLabels } from '@/constants/locationLabels';
import { Location, LocationType } from '@/types/enums';

interface RegionSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
}

const RegionSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  className,
}: RegionSelectorProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const regions = [
    { value: '', label: '지역을 선택해주세요' },
    ...Object.entries(Location).map(([key]) => ({
      value: key,
      label: LocationLabels[key as LocationType],
    })),
  ];

  return (
    <div className={className}>
      <select
        {...field}
        className='w-full rounded-lg border border-gray-300 px-3 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
      >
        {regions.map((region) => (
          <option
            key={region.value}
            value={region.value}
          >
            {region.label}
          </option>
        ))}
      </select>
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

export default RegionSelector;
