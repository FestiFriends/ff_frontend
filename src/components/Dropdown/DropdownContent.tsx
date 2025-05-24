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

  const dropdownContentClasses = cn(
    // default style
    'absolute z-10',

    // custom style
    className
  );

  return <ul className={dropdownContentClasses}>{children}</ul>;
};

export default DropdownContent;
