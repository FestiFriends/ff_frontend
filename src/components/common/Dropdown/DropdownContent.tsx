'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownContentProps {
  className?: string;
}

const DropdownContent = ({
  className,
  children,
}: PropsWithChildren<DropdownContentProps>) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  const dropdownContentClasses = cn(
    // default style
    'absolute z-10 overflow-hidden',

    // focus style
    'focus:outline-none',

    // custom style
    className
  );

  return (
    <ul
      role='menu'
      className={dropdownContentClasses}
    >
      {children}
    </ul>
  );
};

export default DropdownContent;
