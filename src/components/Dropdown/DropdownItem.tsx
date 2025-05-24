'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownItemProps {
  value: string;
  className?: string;
}

const DropdownItem = ({
  value,
  className,
  children,
}: PropsWithChildren<DropdownItemProps>) => {
  const { isOpen, selectedItem, setSelectedItem, closeDropdown } =
    useDropdownContext();
  const itemRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    setSelectedItem(value);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === '  ') {
      e.preventDefault();
      setSelectedItem(value);
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen && selectedItem === value) {
      itemRef.current?.focus();
    }
  }, [isOpen, selectedItem, value]);

  const dropdownItemClasses = cn(
    // default style
    'bg-white',

    // focus style
    'focus:bg-gray-300',

    // custom style
    className
  );

  return (
    <li
      role='menuitem'
      ref={itemRef}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={dropdownItemClasses}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
