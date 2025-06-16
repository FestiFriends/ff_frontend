'use client';

import { PropsWithChildren } from 'react';
import AltArrowDownIcon from '@/components/icons/AltArrowDownIcon';
import AltArrowUpIcon from '@/components/icons/AltArrowUpIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { useStyles } from '@/hooks';
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
