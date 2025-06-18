'use client';
import React, { useRef, useState, useCallback } from 'react';
import AltArrowUpIcon from '@/components/icons/AltArrowUpIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { LocationLabels } from '@/constants/locationLabels';
import { LocationValues } from '@/constants/locationValues';
import useClickOutside from '@/hooks/useClickOutside/useClickOutside';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { cn } from '@/lib/utils';
import { Location } from '@/types/enums';

interface PerformancesLocationSelectorProps {
  queryKey?: string;
  placeholder?: string;
  resetPage?: boolean;
  className?: string;
}

const PerformancesLocationSelector = ({
  queryKey = 'location',
  placeholder = '지역',
  resetPage = true,
  className,
}: PerformancesLocationSelectorProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });

  const { getQueryParam, setMultipleQueryParams } = useQueryParam();
  const selectedLocation = getQueryParam(queryKey) || '';

  useClickOutside({ ref: selectorRef, onClose: () => setIsOpen(false) });

  const toggleSelector = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleLocationSelect = useCallback(
    (locationValue: string) => {
      const queryParams: Record<string, string | null> = {
        [queryKey]: locationValue || null,
      };

      if (resetPage) {
        queryParams.page = '1';
      }

      setMultipleQueryParams(queryParams);
      setIsOpen(false);
    },
    [queryKey, resetPage, setMultipleQueryParams]
  );

  const handleReset = useCallback(() => {
    const queryParams: Record<string, string | null> = {
      [queryKey]: null,
    };

    if (resetPage) {
      queryParams.page = '1';
    }

    setMultipleQueryParams(queryParams);
  }, [queryKey, resetPage, setMultipleQueryParams]);

  const selectorTriggerClasses = cn(
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 transition-all select-none',
    (isOpen || selectedLocation) && 'border-gray-950 bg-gray-950 text-white'
  );

  const locationOptions = Object.values(Location).map((locationKey) => ({
    label: `${LocationLabels[locationKey]}`,
    value: `${LocationValues[locationKey]}`,
  }));

  return (
    <div
      ref={selectorRef}
      className={cn('relative z-20 inline-block', className)}
    >
      <button
        ref={buttonRef}
        aria-label='location selector open'
        onClick={toggleSelector}
        className={selectorTriggerClasses}
      >
        {!selectedLocation ? (
          <span className='text-14_M leading-normal tracking-[-0.35px]'>
            {placeholder}
          </span>
        ) : (
          <span className='text-14_M leading-normal tracking-[-0.35px]'>
            {locationOptions.find((option) => option.value === selectedLocation)
              ?.label || selectedLocation}
          </span>
        )}
        {selectedLocation ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
          >
            <DeleteIcon className='aspect-square h-4 w-4 text-white' />
          </button>
        ) : (
          <AltArrowUpIcon
            className={`aspect-square h-4 w-4 ${isOpen ? 'text-white' : 'rotate-180 text-gray-950'}`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className='fixed z-20 inline-flex w-[calc(100vw-2rem)] -translate-x-1/2 flex-col gap-4 overflow-hidden rounded-[12px] border-1 border-gray-50 bg-white p-5 shadow-lg'
          style={{
            top: `${buttonPosition.top + 8}px`,
            left: '50%',
          }}
        >
          <div className='grid grid-cols-4 gap-3'>
            {locationOptions.map((location) => (
              <button
                key={location.value}
                onClick={() => handleLocationSelect(location.value)}
                className={cn(
                  'flex items-center justify-center rounded-full border px-4 py-3 text-14_M transition-all',
                  selectedLocation === location.value
                    ? 'border-gray-950 bg-gray-950 text-white'
                    : 'border-gray-200 bg-white text-gray-950 hover:border-gray-300'
                )}
              >
                {location.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformancesLocationSelector;
