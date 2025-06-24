'use client';

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AltArrowUpIcon, DeleteIcon } from '@/components/icons';
import { useClickOutside, useQueryParam } from '@/hooks/';
import { cn } from '@/lib/utils';

interface SortOption {
  label: string;
  value: string;
}

interface CustomSortDropdownProps {
  options: SortOption[];
  placeholder?: string;
  queryKey: string;
  width?: 'full' | 'fit' | 'auto';
  className?: string;
}

const CustomSortDropdown = ({
  options,
  placeholder = '정렬',
  queryKey,
  width = 'fit',
  className,
}: CustomSortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getQueryParam, setQueryParam } = useQueryParam();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = getQueryParam(queryKey) || '';
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  useClickOutside({
    ref: dropdownRef,
    onClose: () => setIsOpen(false),
  });

  const handleFn = {
    toggle: () => {
      setIsOpen(!isOpen);
    },
    select: (value: string) => {
      setQueryParam(queryKey, value);
      setIsOpen(false);
    },
    clear: (e: React.MouseEvent) => {
      e.stopPropagation();
      setQueryParam(queryKey, '');
    },
  };

  const TriggerButton = () => (
    <div
      className={cn(
        'inline-flex items-center gap-1 overflow-hidden rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap transition-all',
        (isOpen || selectedValue) && 'border-gray-950 bg-gray-950 text-white'
      )}
    >
      <button
        onClick={handleFn.toggle}
        className='flex cursor-pointer items-center gap-1 border-none bg-transparent p-0'
      >
        <span className='text-14_M leading-normal tracking-[-0.35px]'>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {!selectedValue && (
          <AltArrowUpIcon
            className={cn(
              'aspect-square h-4 w-4',
              isOpen ? 'text-white' : 'rotate-180 text-gray-950'
            )}
          />
        )}
      </button>

      {selectedValue && (
        <button
          onClick={handleFn.clear}
          className='flex cursor-pointer items-center justify-center border-none bg-transparent p-0'
          aria-label='선택 항목 삭제'
        >
          <DeleteIcon className='aspect-square h-4 w-4 text-white' />
        </button>
      )}
    </div>
  );

  const OptionButton = ({
    option,
    index,
  }: {
    option: SortOption;
    index: number;
  }) => (
    <button
      onClick={() => handleFn.select(option.value)}
      className={cn(
        'flex items-center justify-center gap-2 bg-white px-4 py-3.5 text-16_M leading-normal tracking-[-0.4px] transition-colors hover:bg-gray-50',
        selectedValue === option.value
          ? 'bg-gray-950 text-white'
          : 'text-gray-950',
        index === 0 && 'pt-4.5 pb-3.5',
        index === options.length - 1 && 'pt-3.5 pb-4.5',
        index !== options.length - 1 && 'border-b border-gray-50'
      )}
    >
      {option.label}
    </button>
  );

  return (
    <>
      <div
        className={cn('relative inline-block rounded-[100px]', className)}
        ref={dropdownRef}
      >
        <TriggerButton />
      </div>
      {isOpen
        && typeof window !== 'undefined'
        && dropdownRef.current
        && createPortal(
          <div
            className={cn(
              'fixed z-20 mt-2 flex flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white shadow-lg',
              {
                'w-full': width === 'full',
                'w-auto': width === 'auto',
                'w-fit min-w-25': width === 'fit',
              }
            )}
            style={{
              top: dropdownRef.current.getBoundingClientRect().bottom + 8,
              left: dropdownRef.current.getBoundingClientRect().left,
            }}
          >
            {options.map((option, index) => (
              <OptionButton
                option={option}
                index={index}
                key={option.value}
              />
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default CustomSortDropdown;
