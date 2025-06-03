'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownTriggerProps {
  placeholder?: string;
  className?: string;
  value?: string;
}

const DropdownTrigger = ({
  placeholder = '',
  className,
  value,
}: PropsWithChildren<DropdownTriggerProps>) => {
  const { toggleDropdown } = useDropdownContext();

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  const dropdownTriggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-between rounded-md border px-4 py-2',

    // hover style
    'hover:bg-gray-200',

    // focus style
    'focus:bg-gray-300 focus:outline-none',

    // custom style
    className
  );

  return (
    <button
      onClick={toggleDropdown}
      className={dropdownTriggerClasses}
    >
      {value || placeholder}
    </button>
  );
};

export default DropdownTrigger;
