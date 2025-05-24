'use client';

import { PropsWithChildren, useRef } from 'react';
import useDropdownState from '@/app/hooks/useDropdownState';
import useOutsideClick from '@/app/hooks/useOutsideClick';
import { cn } from '@/lib/utils';
import { DropdownContext } from './DropdownContext';

interface DropdownProps {
  className?: string;
}

const Dropdown = ({
  className,
  children,
}: PropsWithChildren<DropdownProps>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownState = useDropdownState();

  useOutsideClick({ ref: dropdownRef, onClose: dropdownState.closeDropdown });

  const dropdownClasses = cn(
    // default style
    'relative inline-block',

    // custom style
    className
  );

  return (
    <DropdownContext.Provider value={dropdownState}>
      <div
        ref={dropdownRef}
        className={dropdownClasses}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
