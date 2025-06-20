import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { BottomSheetModal } from '@/components/common';
import { AltArrowUpIcon } from '@/components/icons';
import { LocationLabels } from '@/constants/locationLabels';
import { cn } from '@/lib/utils';
import { generateFilterOptions } from '@/utils';
const LOCATION_OPTIONS = generateFilterOptions(LocationLabels, false);

interface FormLocationSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
}

const FormLocationSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  placeholder = '지역을 선택해주세요',
  rules,
  disabled = false,
  className,
  triggerClassName,
}: FormLocationSelectorProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const selectedOption = LOCATION_OPTIONS.find(
    (option) => option.value === field.value
  );
  const displayText = selectedOption?.label || placeholder;

  const handleLocationSelect = (selectedValue: string) => {
    field.onChange(selectedValue);
  };

  const TriggerButton = ({ onClick }: { onClick?: () => void }) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-2 rounded-2xl border border-gray-100 bg-white px-5 py-4 text-left transition-colors duration-200',
        'hover:bg-gray-50',
        'focus:ring-2',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
        error && 'border-red-300 focus:ring-red-500',
        triggerClassName
      )}
    >
      <span
        className={cn(
          'flex-1 whitespace-nowrap',
          selectedOption ? 'text-gray-900' : 'text-gray-500'
        )}
      >
        {displayText}
      </span>
      <AltArrowUpIcon className='h-6 w-6 flex-shrink-0 rotate-90' />
    </button>
  );

  return (
    <div className={className}>
      <BottomSheetModal
        trigger={<TriggerButton />}
        height='auto'
        title=''
        hasHandle={false}
        hasClose={false}
      >
        <div className='p-5'>
          <div className='grid grid-cols-4 place-items-stretch gap-4'>
            {LOCATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLocationSelect(option.value)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-[80px]',
                  'border-1 border-gray-100 px-5 py-3',
                  'text-14_M leading-normal tracking-[-0.35px] whitespace-nowrap',
                  'transition-colors duration-200',
                  'hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none',
                  option.value === field.value
                    ? 'bg-gray-950 text-white hover:bg-gray-700'
                    : 'text-gray-950'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className='my-4 border-b border-gray-100' />
          <button
            onClick={() => handleLocationSelect('')}
            className={cn(
              'text-md w-full text-gray-500 transition-colors',
              field.value && 'text-red-500 hover:text-red-700'
            )}
          >
            {field.value ? '선택 초기화' : '지역을 선택해 주세요'}
          </button>
        </div>
      </BottomSheetModal>

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

export default FormLocationSelector;
