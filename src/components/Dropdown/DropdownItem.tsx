'use client';

import { PropsWithChildren } from 'react';
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
  const { setSelectedItem, closeDropdown } = useDropdownContext();

  const handleClick = () => {
    setSelectedItem(value);
    closeDropdown();
  };

  return (
    <li
      onClick={handleClick}
      className={className}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
