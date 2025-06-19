'use client';

import { PropsWithChildren } from 'react';
import { AltArrowUpIcon, DeleteIcon } from '@/components/icons';
import { useStyles } from '@/hooks';
import { useDropdownContext } from './';

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
  const { getButtonClasses } = useStyles();
  const dropdownTriggerClasses = getButtonClasses(
    isOpen,
    selectedItem,
    !!selectedItem,
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
      {selectedItem ? (
        <DeleteIcon className='aspect-square h-4 w-4 text-white' />
      ) : (
        <AltArrowUpIcon
          className={`aspect-square h-4 w-4 ${isOpen ? 'text-white' : 'rotate-180 text-gray-950'}`}
        />
      )}
    </button>
  );
};

export default DropdownTriggerWithIcon;
