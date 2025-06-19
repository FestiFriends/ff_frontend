'use client';

import { PropsWithChildren, useRef } from 'react';
import { useClickOutside, useDropdownState } from '@/hooks';
import { cn } from '@/lib/utils';
import { DropdownContext } from './';

interface DropdownProps {
  className?: string;
}

const Dropdown = ({
  className,
  children,
}: PropsWithChildren<DropdownProps>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownState = useDropdownState();

  useClickOutside({ ref: dropdownRef, onClose: dropdownState.closeDropdown });

  // TODO: 디자인 시안 나오면 스타일 수정 필요
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
