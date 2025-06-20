'use client';

import React, { useRef, useState } from 'react';
import AltArrowDownIcon from '@/components/icons/AltArrowDownIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import useClickOutside from '@/hooks/useClickOutside/useClickOutside';
import { cn } from '@/lib/utils';

export interface Item {
  label: string;
  value: string;
}

interface OptionDropdownProps {
  triggerPlaceholder?: React.ReactNode;
  itemList?: Item[];
  onClick?: (value: string) => void;
  isSelected?: boolean;
  variant?: 'default' | 'location';
}

const OptionDropdown = ({
  triggerPlaceholder,
  itemList,
  onClick,
  isSelected,
  variant = 'default',
}: OptionDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClick = (value: string) => {
    onClick?.(value);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(value);
      closeDropdown();
    }
  };

  useClickOutside({ ref: dropdownRef, onClose: closeDropdown });

  const dropdownTriggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap text-gray-950 transition-all select-none',

    // opened, selected style
    isOpen && 'border-gray-950 bg-gray-950 text-white',
    isSelected && 'border-gray-950 bg-gray-950 text-white'
  );

  const dropdownContentClasses = cn(
    'z-10 overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white focus:outline-none',

    // variant styles
    variant === 'default'
      && 'absolute mt-2 flex w-full min-w-25 flex-col focus:outline-none',

    // variant === 'location'
    //   && 'absolute top-full left-full mt-2 grid w-[calc(100vw-1rem)] max-w-[350px] shrink-0 -translate-x-1/2 grid-cols-4 place-items-center justify-center gap-2.5 p-5 px-4'

    variant === 'location'
      && 'fixed top-1/2 left-1/2 grid w-[calc(100vw-1rem)] max-w-[350px] -translate-x-1/2 -translate-y-1/2 grid-cols-4 place-items-center justify-center gap-2.5 p-5'
  );

  const dropdownItemClasses = cn(
    'flex cursor-pointer items-center justify-center bg-white text-center text-14_M leading-normal tracking-[-0.4px] wrap-break-word break-keep whitespace-normal transition-all select-none hover:bg-gray-50 focus:border-gray-950 focus:bg-gray-950 focus:text-white',

    // variant styles
    variant === 'default'
      && 'border-b-1 border-gray-50 px-2 py-3.5 wrap-break-word break-keep whitespace-normal',

    variant === 'location'
      && 'gap-2 rounded-[80px] border-1 border-gray-100 px-5 py-3 whitespace-nowrap'
  );

  return (
    <div
      ref={dropdownRef}
      className='relative inline-block'
    >
      <button
        onClick={toggleDropdown}
        className={dropdownTriggerClasses}
      >
        <span className='text-14_M leading-normal tracking-[-0.35px]'>
          {triggerPlaceholder}
        </span>
        {isSelected ? (
          <DeleteIcon />
        ) : (
          <AltArrowDownIcon
            className={`aspect-square h-4 w-4 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {isOpen && (
        <ul
          role='menu'
          className={dropdownContentClasses}
        >
          {itemList?.map((item, index) => (
            <li
              key={item.value}
              role='menuitem'
              ref={itemRef}
              tabIndex={index}
              onClick={() => handleClick(item.value)}
              onKeyDown={(e) => handleKeyDown(e, item.value)}
              className={dropdownItemClasses}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptionDropdown;
