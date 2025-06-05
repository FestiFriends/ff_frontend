'use client';

import { ReactNode } from 'react';
import MoreIcon from '@/components/icons/MoreIcon';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../Dropdown';

interface MoreDropdownItem {
  label: string;
  children?: ReactNode;
  onClick?: () => void;
}

interface MoreDropdownProps {
  items: MoreDropdownItem[];
  className?: string;
  ariaLabel?: string;
}

const MoreDropdown = ({
  items,
  className,
  ariaLabel = '더보기 메뉴',
}: MoreDropdownProps) => (
  <div aria-label={ariaLabel}>
    <Dropdown className={className}>
      <DropdownTrigger
        isStatic
        className='border-none p-0 hover:bg-transparent focus:bg-transparent'
      >
        <MoreIcon className='h-6 w-6 text-gray-400' />
      </DropdownTrigger>
      <DropdownContent className='right-6 -mt-8'>
        {Array.from(items, (item, index) => (
          <DropdownItem
            key={index}
            label={item.label}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  </div>
);

export default MoreDropdown;
