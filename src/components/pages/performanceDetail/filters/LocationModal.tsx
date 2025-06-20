'use client';

import React from 'react';
import {
  Modal,
  ModalAction,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import { XIcon } from '@/components/icons';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { cn } from '@/lib/utils';

export interface Item {
  label: string;
  value: string;
}

interface LocationModalProps {
  triggerPlaceholder?: React.ReactNode;
  itemList?: Item[];
  onClick?: (value: string) => void;
  isPending?: boolean;
  isSelected?: boolean;
}

const LocationModal = ({
  triggerPlaceholder,
  itemList,
  onClick,
  isPending,
  isSelected,
}: LocationModalProps) => {
  const handleClick = (value: string) => {
    onClick?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(value);
    }
  };

  const triggerClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white px-5 py-3 whitespace-nowrap text-gray-950 transition-all select-none',

    // pending style
    isPending && 'cursor-not-allowed',

    // selected style
    isSelected && 'border-gray-950 bg-gray-950 py-3 pr-4 pl-5 text-white'
  );

  return (
    <Modal>
      <ModalTrigger className={triggerClasses}>
        <span className='text-14_M leading-normal tracking-[-0.35px]'>
          {triggerPlaceholder}
        </span>
        {isSelected && <DeleteIcon />}
      </ModalTrigger>

      <ModalContent className='w-[calc(100%-1rem)] max-w-[360px] rounded-[12px] bg-white px-4 pt-4.5 pb-5'>
        <ModalClose>
          <button className='top-2.5 right-2.5 ring-0 focus:ring-0'>
            <XIcon className='aspect-auto h-7 w-7 shrink-0 text-gray-950' />
          </button>
        </ModalClose>

        <div className='flex flex-col items-center justify-center gap-3'>
          <span className='text-18_B leading-normal tracking-[-0.5px] text-gray-950'>
            지역 선택
          </span>
          <ul
            role='menu'
            className='grid w-full grid-cols-4 place-items-center justify-center gap-2.5'
          >
            {itemList?.map((item, index) => (
              <ModalAction key={item.value}>
                <li
                  role='menuitem'
                  tabIndex={index}
                  onClick={() => handleClick(item.value)}
                  onKeyDown={(e) => handleKeyDown(e, item.value)}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-[80px] border-1 border-gray-100 px-5 py-3 text-center text-14_M leading-normal tracking-[-0.4px] wrap-break-word break-keep whitespace-nowrap transition-all select-none hover:bg-gray-50 focus:border-gray-950 focus:bg-gray-950 focus:text-white ${item.label === triggerPlaceholder ? 'border-gray-950 bg-gray-950 not-only:text-white' : 'border-gray-100 bg-white text-gray-950'}`}
                >
                  {item.label}
                </li>
              </ModalAction>
            ))}
          </ul>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default LocationModal;
