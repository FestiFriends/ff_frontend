'use client';

import React from 'react';
import { BottomSheetModal, Button } from '@/components/common';
import { useModalContext } from '@/components/common/Modal/ModalContext';
import BlankIcon from '@/components/icons/BlankIcon';
import { LocationLabels } from '@/constants/locationLabels';
import { cn } from '@/lib/utils';
import { generateFilterOptions } from '@/utils';

const LOCATION_OPTIONS = generateFilterOptions(LocationLabels);

interface LocationSelectorProps {
  onChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  value: string;
}

const LocationSelectorContent = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { closeModal } = useModalContext();

  const handleSelect = (val: string) => {
    onChange(val);
  };

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <div className='p-5'>
      <div className='grid grid-cols-4 gap-4'>
        {LOCATION_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              'flex items-center justify-center rounded-full border px-5 py-3',
              'text-14_M leading-normal tracking-[-0.35px] whitespace-nowrap',
              'transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:outline-none',
              option.value === value
                ? 'border-none bg-gray-950 text-white hover:text-gray-950'
                : 'border-gray-100 bg-white text-gray-950'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {value && (
        <div className='flex justify-between gap-2.5 pt-4'>
          <Button
            onClick={() => handleSelect('')}
            variant='secondary'
          >
            초기화
          </Button>
          <Button onClick={handleConfirm}>선택 완료</Button>
        </div>
      )}
    </div>
  );
};

const NormalLocationSelector: React.FC<LocationSelectorProps> = ({
  onChange,
  className,
  triggerClassName,
  value,
}) => {
  const selectedOption = LOCATION_OPTIONS.find(
    (o) => o.value === value || o.label === value
  );
  const displayText = selectedOption?.label;

  const TriggerButton = ({ onClick }: { onClick?: () => void }) => (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-2xl border bg-white px-5 py-3 text-16_M',
        'hover:bg-gray-100 focus:ring-2 focus:outline-none',
        triggerClassName
      )}
    >
      <span className={cn(selectedOption ? 'text-gray-950' : 'text-gray-400')}>
        {displayText}
      </span>
      <BlankIcon className='flex-shrink-0' />
    </button>
  );

  return (
    <div className={className}>
      <div className='mb-2.5 text-14_B text-black'>지역</div>
      <BottomSheetModal
        trigger={<TriggerButton />}
        height='auto'
        title=''
        hasHandle={false}
        hasClose={false}
      >
        <LocationSelectorContent
          value={value}
          onChange={onChange}
        />
      </BottomSheetModal>
    </div>
  );
};

export default NormalLocationSelector;
