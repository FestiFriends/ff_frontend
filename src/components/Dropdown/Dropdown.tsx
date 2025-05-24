'use client';

import { PropsWithChildren } from 'react';
import useDropdownState from '@/app/hooks/useDropdownState';
import { cn } from '@/lib/utils';
import { DropdownContext } from './DropdownContext';

interface DropdownProps {
  className?: string;
}

const Dropdown = ({
  className,
  children,
}: PropsWithChildren<DropdownProps>) => {
  const dropdownState = useDropdownState();

  const dropdownClasses = cn(
    // default style
    'relative inline-block',

    // custom style
    className
  );

  return (
    <DropdownContext.Provider value={dropdownState}>
      <div className={dropdownClasses}>{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
