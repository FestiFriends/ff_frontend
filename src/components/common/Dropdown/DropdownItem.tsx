'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownContext } from './DropdownContext';

interface DropdownItemProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

const DropdownItem = ({
  label,
  className,
  children,
  onClick,
}: PropsWithChildren<DropdownItemProps>) => {
  const { isOpen, selectedItem, setSelectedItem, closeDropdown } =
    useDropdownContext();
  const itemRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    if (label === selectedItem) {
      setSelectedItem('');
    } else {
      setSelectedItem(label || '');
    }
    onClick?.();
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedItem(label || '');
      onClick?.();
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen && selectedItem === label) {
      itemRef.current?.focus();
    }
  }, [isOpen, selectedItem, label]);

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  const dropdownItemClasses = cn(
    // default style
    'cursor-pointer bg-white select-none',

    // hover style
    'hover:bg-gray-50',

    // focus style
    'focus:border-gray-950 focus:bg-gray-950 focus:text-white',

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
