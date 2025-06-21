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
  isPending?: boolean;
  isSelected?: boolean;
}

const OptionDropdown = ({
  triggerPlaceholder,
  itemList,
  onClick,
  isPending,
  isSelected,
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
    'inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap text-gray-950 transition-all select-none',

    // pending style
    isPending && 'cursor-not-allowed',

    // opened, selected style
    isOpen && 'border-gray-950 bg-gray-950 text-white',
    isSelected && 'border-gray-950 bg-gray-950 text-white'
  );

  return (
    <div
      ref={dropdownRef}
      className='relative inline-block'
    >
      <button
        onClick={toggleDropdown}
        disabled={isPending}
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
          className='absolute z-10 mt-2 flex w-full min-w-25 flex-col overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white focus:outline-none'
        >
          {itemList?.map((item, index) => (
            <li
              key={item.value}
              role='menuitem'
              ref={itemRef}
              tabIndex={index}
              onClick={() => handleClick(item.value)}
              onKeyDown={(e) => handleKeyDown(e, item.value)}
              className='flex cursor-pointer items-center justify-center border-b-1 border-gray-50 bg-white px-2 py-3.5 text-center text-14_M leading-normal tracking-[-0.4px] wrap-break-word break-keep whitespace-normal transition-all select-none hover:bg-gray-50 focus:border-gray-950 focus:bg-gray-950 focus:text-white'
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
