'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownItemProps {
  label: string;
  value: string;
  className?: string;
  onClick?: () => void;
}

const DropdownItem = ({
  value,
  className,
  children,
  onClick,
}: PropsWithChildren<DropdownItemProps>) => {
  const { isOpen, selectedItem, setSelectedItem, closeDropdown } =
    useDropdownContext();
  const itemRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    setSelectedItem(value);
    closeDropdown();
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedItem(value);
      closeDropdown();
      onClick?.();
    }
  };

  useEffect(() => {
    if (isOpen && selectedItem === value) {
      itemRef.current?.focus();
    }
  }, [isOpen, selectedItem, value]);

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  const dropdownItemClasses = cn(
    // default style
    'cursor-pointer bg-white px-4 py-2 select-none',

    // hover style
    'hover:bg-gray-200',

    // focus style
    'focus:bg-gray-300 focus:outline-none',

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
