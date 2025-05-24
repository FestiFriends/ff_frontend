'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownTriggerProps {
  placeholder?: string;
  className?: string;
}

const DropdownTrigger = ({
  placeholder = '',
  className,
}: PropsWithChildren<DropdownTriggerProps>) => {
  const { toggleDropdown, selectedItem } = useDropdownContext();

  const dropdownTriggerClasses = cn(
    // default style
    'cursor-pointer',

    // custom style
    className
  );

  return (
    <button
      onClick={toggleDropdown}
      className={dropdownTriggerClasses}
    >
      {selectedItem || placeholder}
    </button>
  );
};

export default DropdownTrigger;
