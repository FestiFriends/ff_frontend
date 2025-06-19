'use client';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components/common/Dropdown';
import { cn } from '@/lib/utils';

interface FilterProps {
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface FilterOption {
  label: string;
  value: string;
}

const FilterUi = ({
  options,
  onChange,
  placeholder = '선택',
  className,
}: FilterProps) => {
  const handleClick = (value: string) => () => {
    onChange?.(value);
  };

  return (
    <div className={cn('inline', className)}>
      <Dropdown>
        <DropdownTrigger placeholder={placeholder}></DropdownTrigger>

        <DropdownContent>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              onClick={handleClick(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export default FilterUi;
