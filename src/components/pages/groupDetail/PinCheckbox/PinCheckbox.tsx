import React from 'react';
import { CheckIcon } from '@/components/icons';

interface PinCheckboxProps {
  isPinned: boolean;
  onClick: () => void;
}

const PinCheckbox = ({ isPinned, onClick }: PinCheckboxProps) => (
  <div className='bg-primary-100 px-4 pt-16 pb-[14.5px]'>
    <button
      type='button'
      onClick={onClick}
      className='flex items-center gap-1.5'
    >
      <CheckIcon
        type={isPinned ? 'filled' : 'empty'}
        w-5
        h-5
      />
      <p className='text-14_M text-gray-950'>상단 고정</p>
    </button>
  </div>
);

export default PinCheckbox;
