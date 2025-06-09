'use client';

import { PropsWithChildren } from 'react';
import AltArrowDownIcon from '@/components/icons/AltArrowDownIcon';
import AltArrowUpIcon from '@/components/icons/AltArrowUpIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownTriggerWithIconProps {
  placeholder?: string;
  className?: string;
}

const DropdownTriggerWithIcon = ({
  placeholder = '',
  className,
  children,
}: PropsWithChildren<DropdownTriggerWithIconProps>) => {
  const { isOpen, toggleDropdown, selectedItem } = useDropdownContext();

  const dropdownTriggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 text-gray-950 transition-all',

    // opened, selected style
    (isOpen || selectedItem) && 'border-gray-950 bg-gray-950 text-white',

    // custom style
    className
  );

  return (
    <button
      onClick={toggleDropdown}
      className={dropdownTriggerClasses}
    >
      <span className='text-14_M leading-normal tracking-[-0.35px]'>
        {selectedItem || placeholder || children}
      </span>
      {isOpen ? (
        <AltArrowUpIcon className='aspect-square h-4 w-4 text-white' />
      ) : selectedItem ? (
        <DeleteIcon className='aspect-square h-4 w-4 text-white' />
      ) : (
        <AltArrowDownIcon className='aspect-square h-4 w-4 text-gray-950' />
      )}
    </button>
  );
};

export default DropdownTriggerWithIcon;
