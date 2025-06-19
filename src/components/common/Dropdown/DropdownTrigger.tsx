'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './';

interface DropdownTriggerProps {
  placeholder?: string;
  isStatic?: boolean;
  className?: string;
}

const DropdownTrigger = ({
  placeholder = '',
  isStatic,
  className,
  children,
}: PropsWithChildren<DropdownTriggerProps>) => {
  const { toggleDropdown, selectedItem } = useDropdownContext();

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  const dropdownTriggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-between',

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
      {isStatic ? children : selectedItem || placeholder || children}
    </button>
  );
};

export default DropdownTrigger;
