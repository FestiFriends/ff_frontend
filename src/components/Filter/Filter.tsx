'use client';

import { cn } from '@/lib/utils';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/Dropdown';

interface FilterProps {
  name: string;
  options: filterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface filterOption {
  label: string;
  value: string;
}

const Filter = ({
  name,
  options,
  value,
  onChange,
  placeholder = '선택',
  className,
}: FilterProps) => {
  return (
    <div className={cn('inline-block', className)}>
      <Dropdown>
        <DropdownTrigger placeholder={placeholder}></DropdownTrigger>

        <DropdownContent>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              onClick={() => onChange?.(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export default Filter;
